const bcrypt = require('bcrypt');

async function run() {
  const password = 'Superadmin@123'; // choose strong password
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

run();
