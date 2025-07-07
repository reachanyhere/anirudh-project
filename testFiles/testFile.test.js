import {
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
} from './testFile';

describe('Calculator Functions', () => {
    describe('add()', () => {
        test('should add two positive numbers correctly', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should add negative numbers correctly', () => {
            expect(add(-2, -3)).toBe(-5);
        });

        test('should add positive and negative numbers correctly', () => {
            expect(add(5, -3)).toBe(2);
        });

        test('should add decimal numbers correctly', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3);
        });

        test('should throw error for non-number inputs', () => {
            expect(() => add('2', 3)).toThrow('Both arguments must be numbers');
            expect(() => add(2, '3')).toThrow('Both arguments must be numbers');
            expect(() => add('a', 'b')).toThrow('Both arguments must be numbers');
        });
    });

    describe('subtract()', () => {
        test('should subtract two numbers correctly', () => {
            expect(subtract(5, 3)).toBe(2);
        });

        test('should handle negative results', () => {
            expect(subtract(3, 5)).toBe(-2);
        });

        test('should throw error for non-number inputs', () => {
            expect(() => subtract('5', 3)).toThrow('Both arguments must be numbers');
        });
    });

    describe('multiply()', () => {
        test('should multiply two positive numbers correctly', () => {
            expect(multiply(4, 5)).toBe(20);
        });

        test('should handle multiplication by zero', () => {
            expect(multiply(5, 0)).toBe(0);
        });

        test('should handle negative numbers', () => {
            expect(multiply(-3, 4)).toBe(-12);
            expect(multiply(-3, -4)).toBe(12);
        });

        test('should throw error for non-number inputs', () => {
            expect(() => multiply(null, 5)).toThrow('Both arguments must be numbers');
        });
    });

    describe('divide()', () => {
        test('should divide two numbers correctly', () => {
            expect(divide(10, 2)).toBe(5);
        });

        test('should handle decimal results', () => {
            expect(divide(10, 3)).toBeCloseTo(3.333, 3);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
        });

        test('should throw error for non-number inputs', () => {
            expect(() => divide(undefined, 2)).toThrow('Both arguments must be numbers');
        });
    });
});

describe('Array Utility Functions', () => {
    describe('findMax()', () => {
        test('should find maximum value in array', () => {
            expect(findMax([1, 5, 3, 9, 2])).toBe(9);
        });

        test('should work with negative numbers', () => {
            expect(findMax([-1, -5, -3, -9, -2])).toBe(-1);
        });

        test('should work with single element array', () => {
            expect(findMax([42])).toBe(42);
        });

        test('should throw error for empty array', () => {
            expect(() => findMax([])).toThrow('Input must be a non-empty array');
        });

        test('should throw error for non-array input', () => {
            expect(() => findMax('not an array')).toThrow('Input must be a non-empty array');
        });

        test('should throw error for array with non-numbers', () => {
            expect(() => findMax([1, 2, 'three', 4])).toThrow('All elements must be numbers');
        });
    });

    describe('findMin()', () => {
        test('should find minimum value in array', () => {
            expect(findMin([1, 5, 3, 9, 2])).toBe(1);
        });

        test('should work with negative numbers', () => {
            expect(findMin([-1, -5, -3, -9, -2])).toBe(-9);
        });

        test('should throw error for empty array', () => {
            expect(() => findMin([])).toThrow('Input must be a non-empty array');
        });
    });

    describe('calculateAverage()', () => {
        test('should calculate average correctly', () => {
            expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
        });

        test('should handle decimal averages', () => {
            expect(calculateAverage([1, 2, 3])).toBeCloseTo(2);
        });

        test('should work with negative numbers', () => {
            expect(calculateAverage([-2, 0, 2])).toBe(0);
        });

        test('should throw error for empty array', () => {
            expect(() => calculateAverage([])).toThrow('Input must be a non-empty array');
        });
    });
});

describe('String Utility Functions', () => {
    describe('capitalizeWords()', () => {
        test('should capitalize first letter of each word', () => {
            expect(capitalizeWords('hello world')).toBe('Hello World');
        });

        test('should handle single word', () => {
            expect(capitalizeWords('hello')).toBe('Hello');
        });

        test('should handle already capitalized text', () => {
            expect(capitalizeWords('Hello World')).toBe('Hello World');
        });

        test('should handle empty string', () => {
            expect(capitalizeWords('')).toBe('');
        });

        test('should handle mixed case', () => {
            expect(capitalizeWords('hELLo WoRLd')).toBe('HELLo WoRLd');
        });

        test('should throw error for non-string input', () => {
            expect(() => capitalizeWords(123)).toThrow('Input must be a string');
        });
    });

    describe('isPalindrome()', () => {
        test('should return true for simple palindromes', () => {
            expect(isPalindrome('racecar')).toBe(true);
            expect(isPalindrome('level')).toBe(true);
        });

        test('should return true for palindromes with spaces and punctuation', () => {
            expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
            expect(isPalindrome('race a car')).toBe(false);
        });

        test('should handle case insensitivity', () => {
            expect(isPalindrome('RaceCar')).toBe(true);
        });

        test('should return false for non-palindromes', () => {
            expect(isPalindrome('hello')).toBe(false);
        });

        test('should handle empty string', () => {
            expect(isPalindrome('')).toBe(true);
        });

        test('should throw error for non-string input', () => {
            expect(() => isPalindrome(null)).toThrow('Input must be a string');
        });
    });
});

describe('User Class', () => {
    describe('constructor', () => {
        test('should create user with valid data', () => {
            const user = new User('John Doe', 'john@example.com', 25);
            expect(user.name).toBe('John Doe');
            expect(user.email).toBe('john@example.com');
            expect(user.age).toBe(25);
            expect(user.isActive).toBe(true);
        });

        test('should throw error for invalid name', () => {
            expect(() => new User('', 'john@example.com', 25)).toThrow('Name must be a non-empty string');
            expect(() => new User(null, 'john@example.com', 25)).toThrow('Name must be a non-empty string');
        });

        test('should throw error for invalid email', () => {
            expect(() => new User('John', 'invalid-email', 25)).toThrow('Email must be a valid email address');
            expect(() => new User('John', '', 25)).toThrow('Email must be a valid email address');
        });

        test('should throw error for invalid age', () => {
            expect(() => new User('John', 'john@example.com', -5)).toThrow('Age must be a non-negative number');
            expect(() => new User('John', 'john@example.com', 'twenty')).toThrow('Age must be a non-negative number');
        });
    });

    describe('getFullInfo()', () => {
        test('should return formatted user information', () => {
            const user = new User('Jane Smith', 'jane@example.com', 30);
            expect(user.getFullInfo()).toBe('Jane Smith (jane@example.com) - Age: 30');
        });
    });

    describe('isAdult()', () => {
        test('should return true for adults (18+)', () => {
            const adult = new User('Adult User', 'adult@example.com', 18);
            expect(adult.isAdult()).toBe(true);
        });

        test('should return false for minors (<18)', () => {
            const minor = new User('Minor User', 'minor@example.com', 17);
            expect(minor.isAdult()).toBe(false);
        });
    });

    describe('activate() and deactivate()', () => {
        test('should deactivate user', () => {
            const user = new User('Test User', 'test@example.com', 25);
            expect(user.isActive).toBe(true);
            user.deactivate();
            expect(user.isActive).toBe(false);
        });

        test('should activate user', () => {
            const user = new User('Test User', 'test@example.com', 25);
            user.deactivate();
            expect(user.isActive).toBe(false);
            user.activate();
            expect(user.isActive).toBe(true);
        });
    });
});

describe('Async Functions', () => {
    describe('fetchUserData()', () => {
        test('should return user data for valid user ID', async () => {
            const userData = await fetchUserData(1);
            expect(userData).toEqual({
                id: 1,
                name: 'User 1',
                email: 'user1@example.co.in'
            });
        });

        test('should throw error for invalid user ID', async () => {
            await expect(fetchUserData(999)).rejects.toThrow('User not found');
        });

        test('should throw error for non-number user ID', async () => {
            await expect(fetchUserData('invalid')).rejects.toThrow('User ID must be a positive number');
        });

        test('should throw error for negative user ID', async () => {
            await expect(fetchUserData(-1)).rejects.toThrow('User ID must be a positive number');
        });

        test('should throw error for zero user ID', async () => {
            await expect(fetchUserData(0)).rejects.toThrow('User ID must be a positive number');
        });
    });
});

// Integration tests
describe('Integration Tests', () => {
    test('should create user and perform calculations', () => {
        const user = new User('Calculator User', 'calc@example.com', 25);
        const sum = add(user.age, 5);
        const isAdultAndOlder = user.isAdult() && sum > 25;
        
        expect(sum).toBe(30);
        expect(isAdultAndOlder).toBe(true);
    });

    test('should work with array of user ages', () => {
        const users = [
            new User('User1', 'user1@example.com', 20),
            new User('User2', 'user2@example.com', 25),
            new User('User3', 'user3@example.com', 30)
        ];
        
        const ages = users.map(user => user.age);
        const averageAge = calculateAverage(ages);
        const maxAge = findMax(ages);
        
        expect(averageAge).toBe(25);
        expect(maxAge).toBe(30);
    });
});
