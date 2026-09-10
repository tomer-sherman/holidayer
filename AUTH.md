
The auth layer:

Register router:

it contains:

userModel object, from mongoose,

all The validation is currently whithin the userSchema,
different validation alot of those use regex and more.

another important layer is the UserSchema.pre.
which basically triggers on every save func.
what it does, it saves hashes properly in the DB

what happens is this:
if the field is CLEAN, which basically checks if this field is already stored in this specific document already.
If not then hash and store the password, using the hash util i created.

so it works like this

req.body => router => userController => registerRoute=> register service => activates save => validates the data using the schema => if the password is DIRTY meaning it was not stored yet => hashes and stores the hashed password.

OHH YEA i totally forgot. The service it self, returns a JWT token using the same security util i created. that is valid for 1 hour.

then it expiers. so when i am going to create the verifyIfLoggedIn, this will come in handy.

lOGIN ROUTE:




