class Media{
    constructor(props){
        this.id=props.id
        this.photographerId=props.photographerId
        this.title=props.title
        this.likes=props.likes
        this.date=props.date
        this.price=props.price
        this.src=null
    }
    getSrc(){
        return this.src
    }
    createHtmlCard(){
        const $element = document.querySelector("img");
        $element.setProperty("src", this.src);
    }
}

class Image extends Media{
    constructor(props){
        super(props)
        this.src=props.image;
    }
}
class Video extends Media{
    constructor(props){
        super(props)
        this.src=props.video;
    }
    createHtmlCard(){
        const $element = document.querySelector("video");
        $element.setProperty("src", this.src);
    }
}

const media = new Image();

media.createHtmlCard