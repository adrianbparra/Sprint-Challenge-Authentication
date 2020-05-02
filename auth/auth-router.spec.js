const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");

beforeEach(async () =>{
    await db("users").truncate();
})

describe("register endpoit", () =>{
    
    test("to register a user and return user", () =>{

        const user = {username: "adrian", password:"pass1234"}

        return request(server).post("/api/auth/register").send(user).expect(201)

        
    })

    test("to return error when username exist" , async () =>{

        const user = {username: "adrian", password:"pass1234"}

        await request(server).post("/api/auth/register").send(user).expect(201)

        return request(server).post("/api/auth/register").send(user).expect(500)


    })
})

describe("login", () =>{

    test("login returns 200", async () =>{

        const user = {username: "adrian", password:"pass1234"}

        await request(server).post("/api/auth/register").send(user).expect(201)
        
        return request(server).post("/api/auth/login").send(user).expect(200)

    })

    test("login returns token", async () =>{
        const user = {username: "adrian", password:"pass1234"}

        await request(server).post("/api/auth/register").send(user).expect(201)
        
        const logindata = await request(server).post("/api/auth/login").send(user)

        expect(logindata.body).toMatchObject({username: "adrian", token: expect.anything()})
    })
})