export  const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-PK',{
        style : 'currency',
        currency : 'PKR'
    }).format(price)
}






// Soch lo tumhara ek online store hai 💻 jahan tum products bech rahe ho — koi customer aata hai aur price dekhta hai, lekin usko sirf “5000” likha dikhai deta hai 😐
// To wo confuse ho jata hai, “ye number kya hai, rupees hain ya dollars?”

// Phir tum ye chhota sa hero function likhte ho —
// DisplayPriceInRupees() 🦸‍♂️
// jo har number ko “Rs 5,000.00” jaise smart aur readable format me badal deta hai 💰

// Ab jab bhi koi customer tumhara store dekhta hai, use clearly samajh aata hai ke ye Pakistani Rupees hain — aur tumhara store professional lagta hai 😎