//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");
mongoose.set('strictQuery', true);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/SchoolDB');
var StudentNumber = Math.random();
StudentNumber = Math.floor(StudentNumber *900)+100;
var currentSN = "2023"+StudentNumber
// console.log(currentSN);

const Grade_PropertiesSchema = mongoose.Schema({
  TeacherName: {
    type: String,
    required: [true, "check Teacher title Enter Title"],
  },
  Teacher_Profile_Picture: {
    type: String,
    required: [true, "Please provide a valid link for the teacher's profile picture"]
  },
    address: {
      type: String,
      required: [true, "Check address missing"]
    },
    email_adsress:  {
      type: String,
      required: [true, "Check Email missing"]
    },
    teacher_number: {
      type: String,
      required: [true, "Check Teacher Number missing missing"]
    },
    Title:{
      type:String,
      minlength: 2,
      maxlength: 2,
      required: [true, "check Teacher title Enter Title"],
    },
      grade_number: 
      {
        type: String || Number,
        min:2,
        max: 2,
        required: [true, "check Grade number"],
        
    
      },
      Gender: {
        type: String,
        minlength: 1,
        maxlength: 1,
        required: [true, " Check Gender charector"]
    },
    Subject: {
      type: String,
      
      required: [true, " Check Subject missing"]
  },
    
  
});
const Grade_Propertiesmodel = mongoose.model("Grade_ProCollection", Grade_PropertiesSchema);

const LearnersSchema = mongoose.Schema({ 
  GRADEProps: {
    type: mongoose.Schema.Types.ObjectId, // Reference field
    ref: 'Grade_ProCollection' // Name of the referenced schema collection
  },
Student_Number: {
  type: Number,
  required: [true, "Check Student Name missing"]
},
  Fist_Name: {
    type: String,
    required: [true, "Check First Name missing"]
  },
  Last_Name: {
    type: String,
    required: [true, "Check Last Name missing"]
  },
  grade_number: 
  {
    type: String || Number,
    min: 2,
    max: 2,
    required: [true, "check Grade number"],
    

  },
  Gender: {
      type: String,
      minlength: 1,
      maxlength: 1,
      required: [true, " Check Gender charector"]
  },
  
  Leaner_Profile_Picture: {
    type: String,
    required: [true, "Check profile link missing"]
  },
  address: {
    type: String,
    required: [true, "Check address missing"]
  },
  email_adsress:  {
    type: String,
    required: [true, "Check Email missing"]
  },

  // LearnerT: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}
});

const Learnermodel = mongoose.model("LearnerCollection", LearnersSchema);

const  Grade_PropertiesSave = new Grade_Propertiesmodel({
  TeacherName: "Chad Hitchcock",
  Title:"Mr",
  address: "Diphagane",
  teacher_number: "t5",
  Teacher_Profile_Picture: "https://images.pexels.com/photos/9185400/pexels-photo-9185400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  Subject:"English",
  Gender:"M",
  grade_number:"9C",
  email_adsress:"ronald@gmail.com",


});

const learnerSave = new Learnermodel(
{
  // LearnerT: learnerTeacher,
  Gender:"F",

  Leaner_Profile_Picture:"https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  address:"Jane Furse",
  
  email_adsress:
  "Goad-C@school.co.za",
  
  grade_number:
  "9F",
  Fist_Name: "Sammy",
  Last_Name: "Phahlamohlaka",
  Student_Number:currentSN


});


// Model query for teacher prolile



let Teacher_subjects;

Grade_Propertiesmodel.find(function (err, Teachers) {
  if (err) {
    console.log(err);
  } else {
    Teachers.forEach(function (Teacher) {
      Teacher_subjects = Teacher.Subject;
       console.log(Teacher_subjects);
    });
    // Here you can use the current_learner variable
    // console.log("Current learner is: " + current_learner_Student);
  }
});


let Teacher_Grade;
Grade_Propertiesmodel.find(function (err, Teachers) {
  if (err) {
    console.log(err);
  } else {
    Teachers.forEach(function (Teacher) {
      Teacher_Grade = Teacher.grade_number;
       console.log(Teacher_Grade);
    });
    // Here you can use the current_learner variable
    // console.log("Current learner is: " + current_learner_Student);
  }
});

app.get('/', (req, res) => {
  // res.sendfile('Mylearners.html'); 

  Grade_Propertiesmodel.find(
    
    { grade_number: ["9C","9F"] },
    
    function (err, leanerDetails) {

    if (err) {
      console.log(err)
      
    } else { console.log(leanerDetails)}

    res.render("list", {listTitle: "Today", Learn: leanerDetails});


  });
  
})

// leaners stats model count
app.get('/', (req, res) => {
  // res.sendfile('Mylearners.html'); 

  Learnermodel.find(
    
    { grade_number: ["9C","9F"] },
    
    function (err, leanerDetails) {

    if (err) {
      console.log(err)
      
    } else { console.log(leanerDetails)}

    res.render("list", {listTitle: "Today", Learn: leanerDetails});


  });
  
})



// Model query for Leaners all
// querying leaner by grade
app.get('/Mylearners.html', (req, res) => {
  // res.sendfile('Mylearners.html'); 

  Learnermodel.find(
    
    { grade_number: ["9C","9F"] },
    
    function (err, leanerDetails) {

    if (err) {
      console.log(err)
      
    } else { console.log(leanerDetails)}

    res.render("learners", {listTitle: "Today", Learn: leanerDetails});
   

  });

  
});

// counting the numberr of learners

app.get('/students', function(req, res) {
  Learnermodel.find({}, function(err, students) {
    if (err) {
      console.log(err);
    } else {
      res.render('students', { students: students });
    }
  });
});



// querying leaner by grade



// querying Garde Proparties by informtion

app.get("/", function(req, res) {
  
  
    Learnermodel.find(
      
      { grade_number: ["9C","9F"] },
      
      function (err, leanerDetails) {
  
      if (err) {
        console.log(err)
        
      } else { console.log(leanerDetails)}
  
      res.render("list", {listTitle: "Today", Learn: leanerDetails});
  
  
    })
  // const day = date.getDate();
  
  
  });
  



// adding new leaner
app.post("/", function(req, res){

  const   Fist_Name1 = req.body.newItem;
  const learnerSave = new Learnermodel(
    {
      
      // LearnerT: learnerTeacher,
      Gender:"F",
    
      Leaner_Profile_Picture:"https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address:"Jane Furse",
      
      email_adsress:
      "Goad-C@school.co.za",
      
      grade_number:
      "9F",
      Fist_Name: Fist_Name1,
      Last_Name: "Phahlamohlaka",
      Student_Number:currentSN
    
    
    });

 learnerSave.save().then(() => res.redirect("/Mylearners.html"));

});
// deleting leaner
app.post("/delete", function (req, res) {
  const checkedid = req.body.checkbox;
  Learnermodel.findByIdAndRemove(checkedid, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed User : ", docs);
      res.redirect("/Mylearners.html");
    }
  });
});


// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// database validation
app.listen(3000, function() {

    
  
  console.log("Server started on port 3000");
  
  
});
// Learnermodel.find(
  
//   function (err, learners) {
//   if (err) {
//       console.log(err);
//   } else {
//     learners.forEach(function (learner) {
//         var Curren_leaner = learner.Student_Number 
//       console.log(
//           learner.Student_Number 
//             );
           
  
// });
//   }
// });




// validator
let current_learner_Student;

Learnermodel.find(function (err, learners) {
  if (err) {
    console.log(err);
  } else {
    learners.forEach(function (learner) {
      current_learner_Student = learner.Student_Number;
      // console.log(current_learner_Student);
    });
    // Here you can use the current_learner variable
    // console.log("Current learner is: " + current_learner_Student);
  }
});
const fist_Name_VALIDATOR = "Sammy";
const last_Name_VALIDATOR = "Phahlamohlaka";
const STN_validator = current_learner_Student








Learnermodel.find({ Last_Name: last_Name_VALIDATOR },{ Fist_Name: fist_Name_VALIDATOR },{ Student_Number: STN_validator }, function (err, learners) {
  if (learners.some((learner) => learner.Last_Name === last_Name_VALIDATOR) || learners.some((learner) => learner.Fist_Name === fist_Name_VALIDATOR) && learners.some((learner) => learner.Student_Number === STN_validator)) {
    console.log("Learner already exists");
  } else {
    //  console.log("Learner already add");
      learnerSave.save().then(() => console.log('Learner added'));
  }
});






// Deleting 
// Learnermodel.deleteOne(
//     { _id: "63eca4d68cb526dee3dle"}, {Gender: "M"},   
//      function (err) {
//              if (err) {console.log(err) 
//             } else {
//                 console.log("Delete is Succesful")
        
//              }
            
//             }
//    )
//  Grade_PropertiesSave.save().then(() => console.log('Grade_Properties added'));

  //  learnerSave.save().then(() => console.log('Learner added'));




