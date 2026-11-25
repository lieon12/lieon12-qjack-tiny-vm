// Tiny stack VM (make.fun tiny-stack-vm-01): runs each program.bin/input.bin pair
// from MAKEFUN_INPUT_DIR, writes stdout.bin + exit.txt per instance. Faithful to
// the ISA and its reference VM (kit program/generator/subject/vm.mjs).
import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const A=[0,145,321,388,518,650,779,911,2057,2185,2313,2441,2569,2697,2825,2949,3081,3209,3337,3461,3593,3721,3849,4105,4233,4361,6176,6308,6436,6560,6656,8197,8328,10244,10372,10497,10628];
const T=new Array(256);
for(const v of A)T[v>>7]=[(v>>4)&7,(v>>2)&3,v&3];
function run(p,q){
const n=p.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),o=new Uint8Array(65536);let l=0,i=0,x=0,t=0;
const d=e=>[o.slice(0,l),e];
for(;;){
if(t===1e6)return d(10);
if(x<0||x>=n)return d(9);
const g=T[p[x]];
if(!g)return d(5);
const m=g[0];
if(x+m>=n)return d(9);
t++;
if(s<g[1])return d(2);
if(s-g[1]+g[2]>256)return d(3);
const y=x+1+m;x=y;const z=p[y-1-m];
switch(z){
case 0:return d(0);
case 1:D[s++]=(p[y-1]<<24)>>24;break;
case 2:D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[s-1],a=D[s-2];let r;
r=z===16?(a+b)|0:z===17?(a-b)|0:z===18?Math.imul(a,b):z===19?b===0?0:a===-2147483648&&b===-1?a:(a/b)|0:z===20?b===0?0:b===-1?0:a%b|0:z===21?b===0?0:Math.floor((a>>>0)/(b>>>0))|0:z===22?b===0?0:(a>>>0)%(b>>>0)|0:z===24?a&b:z===25?a|b:z===26?a^b:z===28?a<<(b&31):z===29?a>>(b&31):z===30?(a>>>(b&31))|0:z===32?a===b?1:0:z===33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
if((z===19||z===20||z===21||z===22)&&b===0)return d(4);
s-=2;D[s++]=r;break;}
case 48:case 49:case 50:{
const e=((p[y-2]|p[y-1]<<8)<<16)>>16;let k=1;
if(z!==48){const v=D[--s];k=z===49?v===0:v!==0;}
if(k)x=y+e;break;}
case 51:if(c===64)return d(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;break;
case 52:if(c===0)return d(8);x=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return d(6);D[s-1]=M[a];break;}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return d(6);s-=2;M[a]=v;break;}
case 80:{const w=String(D[s-1]);if(l+w.length>65536)return d(11);s--;for(let j=0;j<w.length;j++)o[l++]=w.charCodeAt(j);break;}
case 81:if(l+1>65536)return d(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return d(D[--s]&255);
}}
}
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
const R=f=>{try{return readFileSync(f)}catch{return new Uint8Array(0)}};
for(const id of readdirSync(I).sort()){
const v=run(R(I+'/'+id+'/program.bin'),R(I+'/'+id+'/input.bin'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/stdout.bin',v[0]);
writeFileSync(O+'/'+id+'/exit.txt',v[1]+'\n');
}
