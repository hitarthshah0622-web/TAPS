'use client';

import {useState} from 'react';
import {CheckCheck,Copy,ExternalLink} from 'lucide-react';
import type {Restaurant} from '@/lib/types';
import {track,validGoogleUrl} from '@/lib/demo-store';

type Props={restaurant:Restaurant;draft:string;rating:number;approved:boolean;beforeLeave:()=>void;disabled?:boolean};

export default function GoogleReviewHandoff({restaurant,draft,rating,approved,beforeLeave,disabled}:Props){
 const [busy,setBusy]=useState(false);
 const [copiedText,setCopiedText]=useState('');
 const [copyFailed,setCopyFailed]=useState(false);
 const canContinue=approved&&!!draft.trim()&&!disabled;
 const connected=validGoogleUrl(restaurant.googleUrl);
 const copied=copiedText===draft;

 async function copyReview(){
  try{await navigator.clipboard.writeText(draft);setCopiedText(draft);setCopyFailed(false);track(restaurant.id,'copy');return true;}
  catch{setCopyFailed(true);return false;}
 }
 function leaving(){beforeLeave();track(restaurant.id,'google',{rating});}
 async function copyAndOpen(){
  if(!canContinue||!connected||busy)return;
  setBusy(true);
  // Same-tab navigation after copying avoids both popup blocking and losing
  // clipboard permission when a newly opened tab takes focus.
  if(await copyReview()){leaving();window.location.assign(restaurant.googleUrl);}
  setBusy(false);
 }

 return <div className="google-handoff">
  <div className="google-steps" aria-label="How to post your review"><span><b>1</b> Copy</span><span><b>2</b> Paste on Google</span><span><b>3</b> Post</span></div>
  <button type="button" className="btn primary full google-btn" disabled={!canContinue||!connected||busy} onClick={copyAndOpen}>
   <span className="google-g">G</span>{busy?'Copying your review…':'Copy & open Google Reviews'}<ExternalLink size={17}/>
  </button>
  <p className="review-footnote">{connected?<>Opens the review form for <strong>{restaurant.name}</strong>.<br/>On Google, tap the review box, paste, and post.</>:<>This restaurant’s Google review link has not been added yet.</>}</p>
  <button type="button" className="text-link copy-only" disabled={!canContinue||busy} onClick={()=>{void copyReview();}}>{copied?<CheckCheck size={16}/>:<Copy size={16}/>} {copied?'Review copied':'Just copy the review'}</button>
  {copyFailed&&<div className="clipboard-help" role="alert"><strong>Copy your review manually</strong><p>Your browser couldn’t copy automatically. Select the review text above and choose Copy.</p>{connected&&<a className={'text-link '+(!canContinue?'disabled':'')} href={canContinue?restaurant.googleUrl:undefined} onClick={leaving}>I copied it — open Google <ExternalLink size={15}/></a>}</div>}
 </div>;
}
