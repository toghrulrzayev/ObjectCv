"use strict";


// let studentsArray = [];
// let teachersArray = [];
// let groupsArray = [];
// let roomsArray = [];

let Academy = function (name, address) {
    this.name = name;
    this.address = address;
    this.students = [];
    this.teachers = [];
    this.rooms = [];
    this.groups = [];
    this.addStudent = function (student) {
        this.students.push(student);
    };
    this.addTeacher = function (teacher) {
        this.teachers.push(teacher);
    };
    this.addRoom = function (room) {
        this.rooms.push(room);
    };
    this.addGroup = function (group) {
        this.groups.push(group);
    };
}

function Student(id, name, surname, email, address) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.address = address;
    this.username = function () {
        return this.name + this.surname;
    }
}

let Teacher = function (id, name, surname, email) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.groups = [];
    this.addGroup = function (group) {
        this.groups.push(group);
    };
}

let Room = function (id, name, capacity) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
}

let Group = function (id, name, room) {
    this.id = id;
    this.name = name;
    this.room = room;
}

let Address = function (street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
};


let academyAddress = new Address("Nizami küçəsi 203B, AF Business House, 2-ci mərtəbə", "Baku", "Azerbaijan");
let codeacademy = new Academy("Code Academy", academyAddress);

let elementAcademyNameWelcome = document.querySelector('#academy-name-welcome');
let elementAcademyAddress = document.querySelector('#academy-address');

elementAcademyNameWelcome.innerHTML = "Welcome to " + codeacademy.name;
elementAcademyAddress.innerHTML = codeacademy.address.street + ", " + codeacademy.address.city + " " + codeacademy.address.country;

let elementAcademyNameSpan = document.querySelector('#academy-name');
elementAcademyNameSpan.innerHTML = codeacademy.name;


let elementstudentCount = document.querySelector('#studentCount');
let elementteacherCount = document.querySelector('#teacherCount');
let elementgroupCount = document.querySelector('#groupCount');
let elementroomCount = document.querySelector('#roomCount');
resetCounts();


function resetCounts(){
    elementstudentCount.innerHTML = codeacademy.students.length;
    elementteacherCount.innerHTML = codeacademy.teachers.length;
    elementgroupCount.innerHTML = codeacademy.groups.length;
    elementroomCount.innerHTML = codeacademy.rooms.length;
}


function saveStudent() {
    let nameInput = document.querySelector('#student-name');
    let surnameInput = document.querySelector('#student-surname');
    let emailInput = document.querySelector('#student-email');
    let streetInput = document.querySelector('#student-address-street');
    let cityInput = document.querySelector('#student-address-city');
    let countryInput = document.querySelector('#student-address-country');

    let studentAddress = new Address(streetInput.value, cityInput.value, countryInput.value);

    let newStudent = new Student((codeacademy.students.length + 1), nameInput.value, surnameInput.value, emailInput.value, studentAddress);
    console.log(newStudent);
    codeacademy.students.push(newStudent);

    nameInput.value = "";
    surnameInput.value = "";
    emailInput.value = "";
    streetInput.value = "";
    cityInput.value = "";
    countryInput.value = "";

    displayStudentList();
}

function displayStudentList() {
    let wrapper = document.querySelector('#students-list');
    let studentsList = "";

    for (let i = 0; i < codeacademy.students.length; i++) {
        studentsList += '<li class="list-group-item">' +
            codeacademy.students[i].id + '. ' +
            codeacademy.students[i].username() + ' - ' +
            codeacademy.students[i].address.street + ' ' +
            codeacademy.students[i].address.city + '</li>';
    }

    wrapper.innerHTML = studentsList;
    resetCounts();
}

function saveRoom() {
    let nameInput = document.querySelector('#room-name');
    let capacityInput = document.querySelector('#room-capacity');

    let newRoom = new Room((codeacademy.rooms.length + 1), nameInput.value, capacityInput.value);
    codeacademy.rooms.push(newRoom);

    nameInput.value = "";
    capacityInput.value = "";
    displayRoomList();
    generateRoomSelectList();
}

function displayRoomList() {
    let wrapper = document.querySelector('#rooms-list');
    let list = "";

    for (let i = 0; i < codeacademy.rooms.length; i++) {
        list += '<li class="list-group-item">' +
            codeacademy.rooms[i].id + '. ' +
            codeacademy.rooms[i].name + ' - ' +
            codeacademy.rooms[i].capacity + '</li>';
    }

    wrapper.innerHTML = list;
    resetCounts();
}

function saveGroup() {
    let nameInput = document.querySelector('#group-name');
    let selectedRoom = document.querySelector('#group-select-room');

    if (isNaN(selectedRoom.value)) {
        alert("Please, select Room to create new group");
        return;
    }

    let newRoom = {};
    for (let i = 0; i < codeacademy.rooms.length; i++) {
        if (codeacademy.rooms[i].id == selectedRoom.value) {
            newRoom = codeacademy.rooms[i];
            break;
        }
    }
    let newGroup = new Group((codeacademy.groups.length + 1), nameInput.value, newRoom);
    codeacademy.groups.push(newGroup);

    nameInput.value = "";
    selectedRoom.selectedIndex = 0;
    displayGroupList();
    generateGroupSelectList();
}

function displayGroupList() {
    let wrapper = document.querySelector('#groups-list');
    let list = "";

    for (let i = 0; i < codeacademy.groups.length; i++) {
        list += '<li class="list-group-item">' +
            codeacademy.groups[i].id + '. ' +
            codeacademy.groups[i].name + ' - ' +
            codeacademy.groups[i].room.name + '</li>';
    }

    wrapper.innerHTML = list;
    resetCounts();
}

function saveTeacher() {
    let nameInput = document.querySelector('#teacher-name');
    let surnameInput = document.querySelector('#teacher-surname');
    let emailInput = document.querySelector('#teacher-email');
    let groupsSelect = document.querySelector('#teacher-select-group');

    if (isNaN(groupsSelect.value)) {
        alert("Please, select Groups to create new teacher");
        return;
    }

    let newTeacher = new Teacher((codeacademy.teachers.length + 1), nameInput.value, surnameInput.value, emailInput.value);

    let selectedGroups = groupsSelect.selectedOptions;
    console.log(selectedGroups);

    for (let i = 0; i < codeacademy.groups.length; i++) {

        for (let j = 0; j < selectedGroups.length; j++) {
            if (codeacademy.groups[i].id == selectedGroups[j].value) {
                newTeacher.addGroup(codeacademy.groups[i])
            }
        }
    }

    codeacademy.teachers.push(newTeacher);

    nameInput.value = "";
    surnameInput.value = "";
    emailInput.value = "";
    groupsSelect.selectedIndex = 0;
    displayTeacherList();
}

function displayTeacherList() {
    let wrapper = document.querySelector('#teachers-list');
    let list = "";

    for (let i = 0; i < codeacademy.teachers.length; i++) {

        let groups = '';
        for (let j = 0; j < codeacademy.teachers[i].groups.length; j++) {
            groups += '<li class="list-group-item">' +
                codeacademy.teachers[i].groups[j].name + ' - ' +
                codeacademy.teachers[i].groups[j].room.name + ' ' +
                '<span class="badge badge-info badge-pill">' +
                codeacademy.teachers[i].groups[j].room.capacity +
                '</span>' +
                '</li>';

        }

        list += '<li class="list-group-item border border-dark">' +
            '<p>' + codeacademy.teachers[i].id + '. ' +
            codeacademy.teachers[i].name + ' ' +
            codeacademy.teachers[i].surname + ' - ' +
            codeacademy.teachers[i].email + '</p>' +
            '<p>Groups</p>' +
            '<ul class="list-group list-group-flush">' +
            groups +
            ' </ul>' +
            '</li>';
    }

    wrapper.innerHTML = list;
    resetCounts();
}

function generateRoomSelectList() {
    let selectRoom = document.querySelector('#group-select-room');

    let options = '<option>Choose...</option>';
    for (let i = 0; i < codeacademy.rooms.length; i++) {
        options += '<option value="' + codeacademy.rooms[i].id + '">' +
            codeacademy.rooms[i].name +
            '</option>';
    }
    selectRoom.innerHTML = options;
}



function generateGroupSelectList() {
    let selectGroup = document.querySelector('#teacher-select-group');

    let options = '<option>Choose...</option>';
    for (let i = 0; i < codeacademy.groups.length; i++) {
        options += '<option value="' + codeacademy.groups[i].id + '">' +
            codeacademy.groups[i].name +
            '</option>';
    }
    selectGroup.innerHTML = options;
}