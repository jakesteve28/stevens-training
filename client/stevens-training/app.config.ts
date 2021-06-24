module.exports = () => {
    if(process.env.NODE_ENV === "production") {
        return {
            name: "stevens-training",
            version: '1.0.0',
            extra: {
              domain: ""
            }
        }
    } else {
        return {
            name: "stevens-training",
            version: '1.0.0',
            extra: {
                domain: "http://localhost:3000/"
            }
        }
    }
}