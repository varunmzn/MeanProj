module.exports.uploadFiles =  (req, res, next) => {
    console.log("asdfsdafasfdsdfasdfa")
    console.log(req.files)
    if (!req.files) {
            console.log("No file received");
            return res.send({
              success: false
            });

          } else {
            console.log('file received');
            return res.send({
              success: true
            })
          }
}