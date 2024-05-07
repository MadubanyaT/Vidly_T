const bcrypt = require('bcryptjs');

async function test(){
    const salt = await bcrypt.genSalt(10);
    const hashedP = await bcrypt.hash('4567', salt)
    console.log(hashedP);
}
test()