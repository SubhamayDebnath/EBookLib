export const createUser = (req, res) => {
    const { username, email, password } = req.body;
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
            username,
            email,
            password,
        },
    });
}