## Important Fixes
- [x] Password must not be returned to client;

------
## Requiriments of the users feature
- [x] Users should be able to register;
- [x] Passwords must be encrypted;
- [x] Backend should be able to authenticate users;

------
## Needs funcionalities to be implemented before been developed.
- [x] Users should be able to verify their email;
- - [x] Needs email module;
- - [x] Needs tokens;

- [ ] Implements users Avatar;
- - [ ] Needs a way to upload image;


- [x] Users should be able to see their profile;
- [ ] Users should be able to recover their passwords;
- [ ] Users should be able to manage their profiles;
- [ ] Users should be able to delete their accounts;
- - [x] Create authentication middleware;


------
## Next Feature: Users and Quizzes modules integration
- [ ] Users should be able to create quizzes;
- [ ] Users should be able to generate a sharable link;

------
## Others chores
- [x] Wrap the error handling logic from the app.ts to a middleware;
- [ ] Implement Tsyringe for dependency injection;
- - [x] Users;
- - [ ] Quizzes;
- [ ] Simplify tests using Builder pattern;
- - [x] Users;
- - [ ] Quizzes;
- [ ] Make the code better;
- [ ] Create new Errors classes and improve error handling;
- [ ] Remove typeorm entities dependency on the tests mocks;
