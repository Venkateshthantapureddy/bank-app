const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const port=process.env.PORT || 3001
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/Students_Reserved_Bank",{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
})
const db=mongoose.connection
db.once("open",()=>{
    console.log("connected to mongodb")
})
const userSchema=new mongoose.Schema({
    userName: String,
    password: String,
    accountNumber: Number,
    branch:String,
    phnNum:Number,
    balance:{
        type:Number,
        default:0,
    }
})
const Customer=mongoose.model("Customer",userSchema)
app.post("/api/signup",async(req,res)=>{
    try{
        const{userName,password,accountNumber,branch,phnNum}=req.body 
        const customer=await Customer.findOne({userName})
        if(customer){
            return res.status(401).json({
                message:"username exists",
            })
        }
        const customerPhn=await Customer.findOne({phnNum})
        if(customerPhn){
            return res.status(401).json({
                message:"phone number exists",
            })
        }
        const customerAcc=await Customer.findOne({accountNumber})
        if(customerAcc){
            return res.status(401).json({
                message:"account number exists",
            })
        }
        if (isNaN(accountNumber) || isNaN(phnNum)) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        const newCustomer=new Customer({
            userName,
            password,
            accountNumber,
            branch,
            phnNum,
        })
        await newCustomer.save()
        res.status(201).json({message:"user created successfully"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})
app.post("/api/login",async(req,res)=>{
    try {
        const{userName,password}=req.body
        const customer=await Customer.findOne({userName})
        if(!customer){
            return res.status(401).json({
                message:"Invalid username",
            })
        }
        if(customer.password!==password){
            return res.status(401).json({
                message:"Invalid password",
            })
        }
        return res.status(200).json({
            message:"Login successful",
            customer:{
                userName:customer.userName,
                accountNumber:customer.accountNumber,
                branch:customer.branch,
                phnNum:customer.phnNum,
                balance:customer.balance,
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        })
    }
})
const depositSchema=new mongoose.Schema({
    userName:String,
    accountNumber:Number,
    date:String,
    depositAmount:Number,
    depositType:String,
})
const Deposit=mongoose.model("Deposit",depositSchema)
app.post("/api/deposit",async(req,res)=>{
    try {
        const{userName,accountNumber,date,depositAmount,depositType}=req.body
        const customer=await Customer.findOne({userName,accountNumber})
        if(!customer){
            return res.status(401).json({message:"Invalid username or account number"})
        }
        customer.balance += parseFloat(depositAmount);
        await customer.save();
        const newDeposit=new Deposit({
            userName,
            accountNumber,
            date,
            depositAmount,
            depositType,
        })
        await newDeposit.save()
        return res.status(200).json({
            message: "Deposit successful",
            balance: customer.balance,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
const withdrawlSchema=new mongoose.Schema({
    userName:String,
    accountNumber:Number,
    withdrawlAmount:Number,
    withdrawlType:String,
    date:String,
}) 
const Withdrawal=mongoose.model("Withdrawal",withdrawlSchema)
app.post("/api/withdrawl",async(req,res)=>{
    try {
        const { userName, accountNumber, withdrawlAmount, withdrawlType, date } = req.body
        const customer=await Customer.findOne({userName,accountNumber})
        if(customer.balance<withdrawlAmount){
            return res.status(401).json({ message: "insufficient funds" });
        }
        customer.balance=customer.balance-withdrawlAmount
        await customer.save()
        const newWithdrawal=new Withdrawal({
            userName,accountNumber,withdrawlAmount,withdrawlType,date,
        })
        await newWithdrawal.save() 
        return res.status(200).json({
            message: "Withdraw successful",
            balance: customer.balance,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})