let mongoose = require('mongoose');

// this is needed to tell the app this model is for managing user accounts; it is not a regular model like book
let plm = require('passport-local-mongoose');
let findorcreate = require('mongoose-findorcreate');

// create the schema.  username and password are automatically included
let accountSchema = new mongoose.Schema({
    facebookId: {
        type: String
    },
    twitterId:{
        type: String
    }
});

// enable plm & findOrCreate on this model
accountSchema.plugin(plm);
accountSchema.plugin(findorcreate);

// make the model public
module.exports = mongoose.model('Account', accountSchema);