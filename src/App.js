import React, {Component} from 'react';
import {Jumbotron, ProgressBar, Alert} from 'react-bootstrap';
import {fetchContent} from './action';
import {connect} from 'react-redux';
import reactStringReplace  from 'react-string-replace';

class App extends Component{

    constructor(props){
        super(props);
        this.state = {timerId: -1, letterIndex: -1};
    }
    componentWillUnmount() {
        const {timerId} = this.state;
        clearInterval(timerId);
    }
    componentDidMount(){
        const {fetchContent} = this.props;
        fetchContent();
        const timerId = setInterval(this.findNextSpace.bind(this), 3000);
        this.setState({timerId});
    }
    findNextSpace(){
        const originalContent = this.props.content;
        if(originalContent != ''){
            const {letterIndex} = this.state;
            let found = false;
            let newLetterIndex = -1;
            const nexContent = originalContent.replace(/>[^<]+(<)/g, (matchPhrase, p, offset, fullText)=> {
                if(letterIndex<(offset+matchPhrase.length) && !found){
                    let fromIndex = letterIndex > offset ? letterIndex - offset -1 : 1;
                    let localIndex =  matchPhrase.indexOf(' ', fromIndex);
                    if(localIndex==-1){
                        localIndex = matchPhrase.length-1;
                    }else if(localIndex==1){
                        localIndex =  matchPhrase.indexOf(' ', fromIndex+1);
                    }
                    const currentWord = matchPhrase.substr(fromIndex, localIndex-fromIndex);
                    newLetterIndex = offset + localIndex + 1;
                    found = true;
                    return matchPhrase.replace(new RegExp(currentWord,'g'), (phrase, offs)=>{
                        if(offs>=fromIndex && offs<=localIndex){
                            return '<span style="color:red">' +currentWord+ '</span>';
                        }else{
                            return currentWord ;
                        }
                    } );
                }else{
                    return matchPhrase;
                }
            });
            this.setState({content: nexContent, letterIndex: newLetterIndex+1});
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.content=='' &&  nextProps.content!=''){
            this.setState({content: nextProps.content});
        }
    }
    render(){
        const {fetching, error} = this.props;
        const {content} = this.state;
        if(fetching){
            return (
                <Jumbotron>
                    <ProgressBar active now={100} label='Идет загрузка'/>
                </Jumbotron>
            );
        }else if(error!='') {
            return (
                <Jumbotron>
                    <Alert bsStyle="danger">{error}</Alert>
                </Jumbotron>
            );
        }else if(content!=''){
            return (<Jumbotron> <div dangerouslySetInnerHTML={{__html: content}}></div></Jumbotron>);
        }else {
            return (<Jumbotron>This is simple test application</Jumbotron>);
        }
    }
}
const mapStateToProp = (state) =>{
    return state;
}

const mapDispatchToProp = (dispatch) =>{
    return {
        fetchContent: ()=>{ dispatch(fetchContent())}
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(App);
