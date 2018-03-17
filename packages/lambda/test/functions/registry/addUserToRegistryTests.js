const should = require('chai')
  .use(require('chai-as-promised'))
  .should();

require('dotenv');

import kudosRegistry from "kudos-registry";

const businessAddress = "0xbac2a9e1995dc4eb23fd565ffe5fecc58eb4f71e";
const userId = "Fred";
const userAddress = "0xFlintstone";

// beforeEach(async function() {
//
//
// });

describe("addUserToRegistryTests", function() {

  it("business with good signature should be able to add user to registry", async function() {

    process.env['KUDOS_ACCOUNT_SEED'] = "a62d1306d2f88e6a9e5adf5b8a632d5026019bfb450c009886dba13e9ed357aa";

    const response = await kudosRegistry.update(businessAddress, userAddress, userId);
    response.status.should.equal(200);
  });


  it("business with bad signature should not be able to add user to registry", async function() {

    process.env['KUDOS_ACCOUNT_SEED'] = "C0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEEEEE";

    let statusCode;

    try {
      const response = await kudosRegistry.update(businessAddress, userAddress, userId);
    } catch(error) {
      statusCode = error.response.status;
    }

    statusCode.should.equal(401);
  });
});
