const fs = require('fs')
const { dirname } = require('path')

// Here we are reading the file because we don't do it in route handler 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// Middleware Checking if the id req by user is valid or not before we hit the req
// Here we are using 4 arguments because it of params not route, param gives extra arg that is "Val"
exports.checkTourId =(req,res,next,val) =>{
    console.log(`The tour id is ${val}`);
    if(req.params.id*1 > tours.length) {
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
    next()
} 

// Middleware for Checking body
exports.checkBody = (req, res, next) => {
    console.log("Running middleware");
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status:'fail',
            message:'Missing name or price'
        })
    }
    next()
}

// Route Handlers
exports.getAllTours = (req,res)=>{
    console.log("tour wale se", req.requestTime);
    res.status(200).json({
        status:'sucess',
        time: req.requestTime,
        results: tours.length,
        data:{
            tours
        }
    })
}

exports.getTour = (req,res)=>{
    const id = req.params.id*1 
    const tour = tours.find(el=>
        el.id === id
    )

    // // if(id > tours.length) {
    // if(!tour) {
    //     return res.status(404).json({
    //         status:'fail',
    //         message:'Invalid ID'
    //     })
    // }


    res.status(200).json({
        status:'success',
        data: {
            tour
        }
    })
}

exports.editTour = (req,res)=>{
    // if(req.params.id*1 > tours.length) {
    //        return res.status(404).json({
    //            status:'fail',
    //            message:'Invalid ID'
    //        })
    //    }

       res.status(200).json({
           status: 'success',
           data: {
               tour: '<Updated tour here...>'
           }
       })
}

exports.addTour = (req,res)=>{
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id:newId}, req.body)

    tours.push(newTour)

    fs.writeFile(`${dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201 ).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.deleteTour = (req,res)=>{
    res.status(204).json({
        status: 'success',
        data: null
    })
}
