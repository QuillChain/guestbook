/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { logging, PersistentMap } from 'near-sdk-as'

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

export function didParticipate(prompt:string, user:string):bool{
  if (userParticipation.contains(prompt)) {
    let getArray = userParticipation.getSome(prompt);
    return getArray.includes(user);
  } else {
    logging.log('prompt not found');
    return false;
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

/*
// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}
*/



/*-------------------------------------------
02. Change Methods
//Changes State of Blockchain
//Cost a transaction fee to do so
//add or modifies infomation to blockchain.
--------------------------------------------- */


export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url);
  logging.log("added url for " + name);
}

export function addCandidatePair(prompt:string, name1:string, name2:string):void{
  CandidatePair.set(prompt,[name1,name2]);
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





/*
export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}
*/