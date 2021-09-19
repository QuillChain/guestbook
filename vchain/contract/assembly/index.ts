import { logging, PersistentMap } from 'near-sdk-as'

const CompanyURL = new PersistentMap<string,string[]>("CompanyURL");
const CompanyArray = new PersistentMap<string,string[]>("CompanyArray");
const CommentArray = new PersistentMap<string,string[]>("CommentArray");
const CompanyVoteArray = new PersistentMap<string,i32[]>("stores company votes");
const userParticipationCompany = new PersistentMap<string,string[]>("user Participation Company Record");

const CandidateURL = new PersistentMap<string,string>("CandidateURL");
const CandidatePair =  new PersistentMap<string,string[]>("Candidate Pair");
const PromptArray = new PersistentMap<string,string[]>("Array of prompts");
const VoteArray = new PersistentMap<string,i32[]>("stores votes");
const userParticipation = new PersistentMap<string,string[]>("user Participation Record");

/*-------------------------------------------
01. View methods
// does not chainge state of the blockchain
// does not incur a fee
// pulls and reads information from blockchain
--------------------------------------------- */

        /*
        * functino 01:
        * Review Company
        */

export function getCompanyByName(companyName:string):string[]{
  if (CompanyURL.contains(companyName)){
    return CompanyURL.getSome(companyName);
  } else {
    logging.log(`can't find that company`);
    return [];
  }
} 

export function getAllCompany():string[]{
  if(CompanyArray.contains("AllCompanyArrays")) {
    logging.log(CompanyArray.getSome("AllCompanyArrays"));
    return CompanyArray.getSome("AllCompanyArrays");
  }else{
    logging.log("no company found");
    return [];
  }
}

export function getAllComments():string[]{
  if(CommentArray.contains("AllCommentArrays")) {
    logging.log(CommentArray.getSome("AllCommentArrays"));
    return CommentArray.getSome("AllCommentArrays");
  }else{
    logging.log("no comment found");
    return [];
  }
}

export function getCompanyVote(companyName:string):i32[]{
  if (CompanyVoteArray.contains(companyName)) {
    return CompanyVoteArray.getSome(companyName)
  } else {
    logging.log('prompt not found for this vote');
    return[0,0];
  }
}

export function didParticipateCompany(companyName:string, user:string):bool{
  if (userParticipationCompany.contains(companyName)) {
    let getArray = userParticipationCompany.getSome(companyName);
    return getArray.includes(user);
  } else {
    logging.log('company not found');
    return false;
  }
}


/*
* Function 02:
* Voting 
*/

export function getUrl(name:string):string{
  if (CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  } else {
    logging.log(`can't find that user`);
    return '';
  }
} 

export function getCandidatePair(prompt:string):string[]{
  if (CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt)
  } else {
    logging.log(`prompt not found`);
    return [];
  }
} 


export function getAllPrompt():string[]{
  if(PromptArray.contains("AllArrays")) {
    logging.log(PromptArray.getSome("AllArrays"));
    return PromptArray.getSome("AllArrays");
  }else{
    logging.log("no prompt found");
    return [];
  }
}

export function getVotes(prompt:string):i32[]{
  if (VoteArray.contains(prompt)) {
    return VoteArray.getSome(prompt)
  } else {
    logging.log('prompt not found for this vote');
    return[0,0];
  }
}


export function didParticipate(prompt:string, user:string):bool{
  if (userParticipation.contains(prompt)) {
    let getArray = userParticipation.getSome(prompt);
    return getArray.includes(user);
  } else {
    logging.log('prompt not found');
    return false;
  }
}














/*-------------------------------------------
02. Change Methods
//Changes State of Blockchain
//Cost a transaction fee to do so
//add or modifies infomation to blockchain.
--------------------------------------------- */


 /*
 * functino 01:
 * Review Company
 */
export function addCompany(companyName:string, imageUrl:string, webUrl: string):void{
  CompanyURL.set(companyName,[imageUrl,webUrl]);
  logging.log("added company " + companyName);

}

export function addToCompanyArray(companyName:string):void{
  logging.log('add to company name to array');
  if (CompanyArray.contains("AllCompanyArrays")){
    let tempArray = CompanyArray.getSome("AllCompanyArrays");
    tempArray.push(companyName);
    CompanyArray.set("AllCompanyArrays", tempArray);

  } else {
    CompanyArray.set("AllCompanyArrays",[companyName]);
  }
}


{/****************** 
 Comment 1.0
********************/}
export function addToCommentArray(comments:string):void{
  logging.log('add to comment to array ');
  if (CommentArray.contains("AllCommentArrays")){
    let tempArray = CommentArray.getSome("AllCommentArrays");

    tempArray.push(comments);
    CommentArray.set("AllCommentArrays", tempArray);

  } else {
    CommentArray.set("AllCommentArrays",[comments]);
  }
}

export function addVoteCompany(companyName:string, index:i32 ):void{
  if (CompanyVoteArray.contains(companyName)){
    let tempArray = CompanyVoteArray.getSome(companyName);
    let temVal = tempArray[index];
    let newVal = temVal +1;
    tempArray[index] = newVal;
    CompanyVoteArray.set(companyName,tempArray);
  } else {
    let newArray = [0,0];
    newArray[index] = 1;
    CompanyVoteArray.set(companyName,newArray);
  }
}

export function recordUserCompany(companyName:string,user:string):void {
  if (userParticipationCompany.contains(companyName)){
    let tempArray = userParticipationCompany.getSome(companyName);
    tempArray.push(user);
    userParticipationCompany.set(companyName,tempArray)
  } else {
    userParticipationCompany.set(companyName,[user]);
  }
}





/*
* Function 02:
* Voting Company
*/
export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url);
  logging.log("added url for " + name);
}

export function addCandidatePair(prompt:string, name1:string, name2:string):void{
  CandidatePair.set(prompt,[name1,name2]);
  logging.log("added Candidate Pair " + prompt);
}

export function addToPromptArray(prompt:string):void{
  logging.log('add to prompt array');
  if (PromptArray.contains("AllArrays")){
    let tempArray = PromptArray.getSome("AllArrays");
    tempArray.push(prompt);
    PromptArray.set("AllArrays", tempArray);

  } else {
    PromptArray.set("AllArrays",[prompt]);
  }
}

export function addVote(prompt:string, index:i32 ):void{
  if (VoteArray.contains(prompt)){
    let tempArray = VoteArray.getSome(prompt);
    let temVal = tempArray[index];
    let newVal = temVal +1;
    tempArray[index] = newVal;
    VoteArray.set(prompt,tempArray);
  } else {
    let newArray = [0,0];
    newArray[index] = 1;
    VoteArray.set(prompt,newArray);
  }
}

export function recordUser(prompt:string,user:string):void {
  if (userParticipation.contains(prompt)){
    let tempArray = userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray)
  } else {
    userParticipation.set(prompt,[user]);
  }
}



