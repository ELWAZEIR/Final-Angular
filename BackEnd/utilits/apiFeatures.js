class apiFeatures
{//mongoose query + query that we got from express
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
        Filter()
        {
            const queryObj={...this.queryString};
            const excludeFields=['page','sort','limit','fields'];
            excludeFields.forEach(function (el){ delete queryObj[el]});
            // duration:{gte:5},difficulty:'easy'
            // duration:{$gte:5},difficulty:'easy'
        //advance filtering
        let queryStr=JSON.stringfy(queryObj);
        queryStr=queryStr.replace(/\bgte|gt|lte|lt\b/g,match=>`$${match}`);
        console.log(JSON.parse(queryStr));
           this.query.find(JSON.parse(queryStr));
        return this;
        }
        sort(){
            if(this.queryString.sort){
                // query=query.sort(req.query.sort);
                 //in mongoose sort('price ratingsAverage')=>
                 //in url      sort=price,ratingsAverage 
                 //so we will handle it to monsoose can recognize it 
                 let sortBy=this.queryString.sort.split(',').join(' ');//split for strings
                 this.query=this.query.sort(sortBy);
                 console.log(sortBy);
             }
             else{
                 this.query=this.query.sort('-createdAt');
             }
             return this;
        }
        limitFields()
        {
            if(this.queryString.fields){
                // query=query.fields(req.query.fields);
                 let fields=this.queryString.fields.split(',').join(' ');
                this.query =this.query.select(fields);
             }
             else{ // - is meaning exclude
                //we have everything except the V field here 
                this.query =this.query.select('-__v');
             }
             return this;
        }
        paginate(){
            const page=this.queryString.page*1||1;//()
            const limit=this.queryString.limit*1||100;
            const skip=(page-1)*limit;
            this.query=this.query.skip(skip).limit(limit);
        return this;
    }
    }


exports.apiFeatures;