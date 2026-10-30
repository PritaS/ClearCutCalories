const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function source(name) {
  const start = html.indexOf('function '+name+'(');
  assert.ok(start >= 0, 'Missing production function '+name);
  let end=html.indexOf('{',start)+1, depth=1;
  while(depth && end<html.length){if(html[end]==='{')depth++;if(html[end]==='}')depth--;end++;}
  assert.equal(depth,0);
  return html.slice(start,end);
}
function context(names, values={}) {
  const nodes={};
  const $=id=>nodes[id]??=( {value:values[id]??'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}}} );
  const ctx={$,num:id=>Number($(id).value),fmt:n=>Math.round(n).toLocaleString('en-US'),fmtUSD2:n=>'$'+n.toFixed(2)};
  vm.createContext(ctx);vm.runInContext(names.map(source).join('\n'),ctx);
  return {ctx,$};
}
test('macro calories convert using 4/4/9 kcal per gram',()=>{
  const {ctx,$}=context(['calcMacro'],{mCal:2000,mStyle:'30,40,30'});
  ctx.calcMacro();assert.equal($('mProt').textContent,'150g');assert.equal($('mCRow').textContent,'200 g · 800 cal');assert.equal($('mFRow').textContent,'67 g · 600 cal');
});
test('BMI arithmetic and category boundary',()=>{
  const {ctx,$}=context(['calcBmi']);ctx.wtKg=()=>80;ctx.heightCm=()=>200;ctx.wUnit=()=>'kg';ctx.wtLocal=n=>n;
  ctx.calcBmi();assert.equal($('bBmi').textContent,'20.0');assert.equal($('bCat').textContent,'within the standard range');
  ctx.wtKg=()=>100;ctx.calcBmi();assert.equal($('bBmi').textContent,'25.0');assert.equal($('bCat').textContent,'above the standard range');
});
