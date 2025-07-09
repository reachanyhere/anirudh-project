// Simple calculator functions
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a - b;
}

function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a * b;
}

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

// Array utility functions
function findMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array');
    }
    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('All elements must be numbers');
    }
    return Math.max(...numbers);
}

function findMin(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array');
    }
    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('All elements must be numbers');
    }
    return Math.min(...numbers);
}

function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array');
    }
    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('All elements must be numbers');
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// String utility functions
function capitalizeWords(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function isPalindrome(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// User class for object-oriented testing
class User {
    constructor(name, email, age) {
        if (!name || typeof name !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
            throw new Error('Email must be a valid email address');
        }
        if (typeof age !== 'number' || age < 0) {
            throw new Error('Age must be a non-negative number');
        }
        
        this.name = name;
        this.email = email;
        this.age = age;
        this.isActive = true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getFullInfo() {
        return `${this.name} (${this.email}) - Age: ${this.age}`;
    }

    isAdult() {
        return this.age >= 18;
    }

    deactivate() {
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
    }
}

// Async function for testing promises
async function fetchUserData(userId) {
    if (typeof userId !== 'number' || userId <= 0) {
        throw new Error('User ID must be a positive number');
    }
    
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 999) {
                reject(new Error('User not found'));
            } else {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.co.in`
                });
            }
        }, 100);
    });
}

// Export functions for testing
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    findMax,
    findMin,
    calculateAverage,
    capitalizeWords,
    isPalindrome,
    User,
    fetchUserData
};

// Demo usage
if (require.main === module) {
    console.log("Hello Node.js Calculator!");
    console.log("5 + 3 =", add(5, 3));
    console.log("10 - 4 =", subtract(10, 4));
    console.log("Max of [1, 5, 3, 9, 2] =", findMax([1, 5, 3, 9, 2]));
    
    const user = new User("John Doe", "john@example.com", 25);
    console.log("User info:", user.getFullInfo());
    console.log("Is adult:", user.isAdult());
}
