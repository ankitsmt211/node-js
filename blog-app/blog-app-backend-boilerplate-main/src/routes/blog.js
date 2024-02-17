const router = require('express').Router();
const Blog = require('../models/Blog')


router.get('/blog',async (req,res)=>{
    let page = req.query.page
    let search = req.query.search

    let blogs = await Blog.find({topic:search})

    if(blogs.length==0){
        res.json({
            status:'success',
            message:'no blogs found for given topic'
        })
        return
    }

    let BLOGS_PER_PAGE = 5
    let items = blogs.length

    let noOfPages = Math.ceil(items/BLOGS_PER_PAGE)

    let startIndex = (page*BLOGS_PER_PAGE)-BLOGS_PER_PAGE
    let endIndex = (page*BLOGS_PER_PAGE)-1

    let blogsToDisplay = blogs.slice(startIndex,endIndex+1)

    res.json({
        status:'success',
        result:blogsToDisplay
    })

})

router.post('/blog', async (req,res)=>{
    let topic = req.body.topic
    let description = req.body.description
    let posted_at = Date.now()
    let posted_by = req.body.posted_by

    try{
        let blog = await Blog.create({
            topic:topic,
            description:description,
            posted_at:posted_at,
            posted_by:posted_by
        })

        res.json({
            status:'success',
            result:blog
        })
    }

    catch(err){
        res.json({
            status:'error',
            message:err.message
        })
    }
    
})

router.put('/blog/:id', async(req,res)=>{
    let blogId = req.params.id

    let oldBlog = await Blog.findOne({_id:blogId})

    let topic = req.body.topic?req.body.topic:oldBlog.topic
    let description = req.body.description?req.body.description:oldBlog.description
    let posted_at = req.body.posted_at?req.body.posted_at:oldBlog.posted_at
    let posted_by = req.body.posted_by?req.body.posted_by:oldBlog.posted_by

    try{
        let updatedBlog = await Blog.findOneAndUpdate(
            {
                _id:blogId
            },
            {
                topic:topic,
                description:description,
                posted_at:posted_at,
                posted_by:posted_by
        },
        {
            new:true
        })


        res.json({
            status:'success',
            result:updatedBlog
        })
    }

    catch(err){
        res.json({
            status:'error',
            message:err.message
        })
    }
})


router.delete('/blog/:id',async (req,res)=>{
    let blogId = req.params.id

    try{
        let deletedBlog = await Blog.findOneAndDelete({_id:blogId})
        res.json({
            status:'success',
            result:deletedBlog
        })
    }
    catch(err){
        res.json({
            status:'error',
            message:err.message
        })
    }
})


module.exports = router;