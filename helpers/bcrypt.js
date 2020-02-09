const bcrypt = require("bcrypt")

// generates a pass hash
exports.generatePasswordHash = (password) => {
    return bcrypt.hashSync(password, 10)
}

// compares hash with provided pass
exports.comparePasswordHash = (hashedPassword, password) => {
    if (bcrypt.compareSync(password, hashedPassword)) {
        return true
    }
    else {
        return false
    }
}