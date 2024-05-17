#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// Define the Student class
class Student {
    name: string;
    fatherName: string;
    rollNumber: number;
    grade: string | number;
    schoolName: string;
    gender: string;
    address?: string;

    constructor(name: string, fatherName: string, rollNumber: number, grade: string | number, schoolName: string, gender: string, address?: string) {
        this.name = name;
        this.fatherName = fatherName;
        this.rollNumber = rollNumber;
        this.grade = grade;
        this.gender = gender;
        this.address = address;
        this.schoolName = schoolName;
    }
}

// Define a simplified Student class for displaying only name and number
class Student1 {
    name: string;
    rollNumber: number;
    grade: string | number;

    constructor(name: string, rollNumber: number, grade: string | number) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grade = grade;
    }
}

// Array to store student objects
const students: Student[] = [];

// Flag to determine if more students need to be added
let moreStudents = true;

// Loop to prompt for student data
while (moreStudents) {
    const userInput = await inquirer.prompt([
        {//Student Name
            name: "stdName",
            type: "input",
            message: "Please enter student name :"
        },
        {//Student Father name
            name: "stdFName",
            type: "input",
            message: "Please enter student father name :"
        },
        {//Student Roll Number
            name: "stdRollNum",
            type: "input",
            message: "Please enter roll number : "
        },
        {//Student Garde
            name: "stdGrade",
            type: "input",
            message: "Please enter Student Grade : "
        },
        {//Student School name
            name: "stdSchool",
            type: "input",
            message: "Please enter School Name : "
        },
        {//Gender
            name: "stdGender",
            type: "list",
            message: "Gender : ",
            choices: ["Male", "Female"]
        },
        {//Addres Optional
            name: 'address',
            type: 'input',
            message: 'Enter address (optional) :',
        },
        {
            name: "moreStudents",
            type: "confirm",
            message: "Add another student?",
            default: true // Default to true
        }
    ]);

    // Create a new student object
    let studentData = new Student(
        userInput.stdName,
        userInput.stdFName,
        parseInt(userInput.stdRollNum),
        userInput.stdGrade,
        userInput.stdSchool,
        userInput.stdGender,
        userInput.address
    );

    // Add new student to the array
    students.push(studentData);

    // Check if more students need to be added
    moreStudents = userInput.moreStudents;
}

// Prompt to choose what data to see
const seeData = await inquirer.prompt({
    name: "choices",
    type: "list",
    choices: ["See Student Data", "See only name And number & grade"]
});

// Display data based on user choice
if (seeData.choices === "See Student Data") {
    console.log(chalk.blueBright("Student Data:"));
    console.log(students);
} else if (seeData.choices === "See only name And number & grade") {
    // Create simplified student data objects
    const studentData2 = students.map(student => new Student1(student.name, student.rollNumber, student.grade));
    console.log(chalk.greenBright("Name and Roll Number & Grade"));
    console.log(studentData2);
}
