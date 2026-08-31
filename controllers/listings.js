const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN || "pk.eyJ1IjoiZGVtbyIsImEiOiJjbGV4YW1wbGUifQ.demo";
let geocodingClient = null;
try {
    if (mapToken) {
        geocodingClient = mbxGeocoding({ accessToken: mapToken });
    }
} catch (e) {
    console.warn("Mapbox client initialization skipped (no valid token):", e.message);
}               


module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category && category.toLowerCase() !== "all") {
        const catKey = category.toLowerCase().trim();
        filter.category = catKey;
    } else if (search && search.trim() !== "") {
        const sRegex = new RegExp(search.trim(), "i");
        filter.$or = [
            { title: { $regex: sRegex } },
            { description: { $regex: sRegex } },
            { location: { $regex: sRegex } },
            { country: { $regex: sRegex } }
        ];
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { 
        allListings, 
        selectedCategory: category || "all", 
        searchQuery: search || "" 
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
         populate: {
            path: "author"
        },
        })
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }
    console.log(listing);
    res.render("listings/show", { listing });
  }

module.exports.createListing = async (req, res, next) => {
    // let response = await geocodingClient.forwardGeocode({
    //        query: req.body.listing.location,
    //        limit: 1
    //      })
    //        .send()

    //        console.log(response.body.features[0].geometry);
    //        res.send("done");

    let url = req.file ? req.file.path : "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60";
    let filename = req.file ? req.file.filename : "defaultimage";   

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}


module.exports.renderEditForm = async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing= async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!== "undefined") {
        let url = req.file.path;
        let filename =req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let {id}= req.params;
    const deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}