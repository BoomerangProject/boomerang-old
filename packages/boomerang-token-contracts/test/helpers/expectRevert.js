export default async (promise) => {
    try {
        await promise;
    } catch (error) {
        // TODO: Check jump destination to distinguish between a throw and an actual invalid jump.
        const invalidOpcode = error.message.search('invalid opcode') > -1;

        // TODO: When contract A calls contract B, and B throws, instead of an 'invalid jump', we get an 'out of gas'
        // error. How do we distinguish this from an actual out of gas event? The testrpc log actually show an "invalid
        // jump" event).
        const outOfGas = error.message.search('out of gas') > -1;

        const typeError = error.message.search('Cannot convert undefined or null to object') > -1;

        assert(invalidOpcode || outOfGas || typeError, `Expected throw, got ${error} instead`);

        return;
    }

    assert(false, "Expected throw wasn't received");
};
