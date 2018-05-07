String.prototype.bool = function() {
    return (/^true$/i).test(this);
};
function randomNumber(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
};
Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 0 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

$.ucfirst = function(str) {
	var text = str;
	var parts = text.split(' '),
		len = parts.length,
		i, words = [];
		for (i = 0; i < len; i++) {
		var part = parts[i];
		var first = part[0].toUpperCase();
		var rest = part.substring(1, part.length);
		var word = first + rest;
		words.push(word);
	}
	return words.join(' ');
};



/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                
                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
                
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
})();


/**
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
 * https://github.com/admsev/jquery-play-sound
 * Usage: $.playSound('http://example.org/sound.mp3');
**/

(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);


/**
 * @license jahashtable, a JavaScript implementation of a hash table. It creates a single constructor function called
 * Hashtable in the global scope.
 *
 * http://www.timdown.co.uk/jshashtable/
 * Copyright 2013 Tim Down.
 * Version: 3.0
 * Build date: 17 July 2013
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Hashtable=function(t){function n(t){return typeof t==p?t:""+t}function e(t){var r;return typeof t==p?t:typeof t.hashCode==y?(r=t.hashCode(),typeof r==p?r:e(r)):n(t)}function r(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}function i(t,n){return t.equals(n)}function u(t,n){return typeof n.equals==y?n.equals(t):t===n}function o(n){return function(e){if(null===e)throw new Error("null is not a valid "+n);if(e===t)throw new Error(n+" must not be undefined")}}function s(t,n,e,r){this[0]=t,this.entries=[],this.addEntry(n,e),null!==r&&(this.getEqualityFunction=function(){return r})}function a(t){return function(n){for(var e,r=this.entries.length,i=this.getEqualityFunction(n);r--;)if(e=this.entries[r],i(n,e[0]))switch(t){case E:return!0;case K:return e;case q:return[r,e[1]]}return!1}}function l(t){return function(n){for(var e=n.length,r=0,i=this.entries,u=i.length;u>r;++r)n[e+r]=i[r][t]}}function f(t,n){for(var e,r=t.length;r--;)if(e=t[r],n===e[0])return r;return null}function h(t,n){var e=t[n];return e&&e instanceof s?e:null}function c(){var n=[],i={},u={replaceDuplicateKey:!0,hashCode:e,equals:null},o=arguments[0],a=arguments[1];a!==t?(u.hashCode=o,u.equals=a):o!==t&&r(u,o);var l=u.hashCode,c=u.equals;this.properties=u,this.put=function(t,e){g(t),d(e);var r,o,a=l(t),f=null;return r=h(i,a),r?(o=r.getEntryForKey(t),o?(u.replaceDuplicateKey&&(o[0]=t),f=o[1],o[1]=e):r.addEntry(t,e)):(r=new s(a,t,e,c),n.push(r),i[a]=r),f},this.get=function(t){g(t);var n=l(t),e=h(i,n);if(e){var r=e.getEntryForKey(t);if(r)return r[1]}return null},this.containsKey=function(t){g(t);var n=l(t),e=h(i,n);return e?e.containsKey(t):!1},this.containsValue=function(t){d(t);for(var e=n.length;e--;)if(n[e].containsValue(t))return!0;return!1},this.clear=function(){n.length=0,i={}},this.isEmpty=function(){return!n.length};var y=function(t){return function(){for(var e=[],r=n.length;r--;)n[r][t](e);return e}};this.keys=y("keys"),this.values=y("values"),this.entries=y("getEntries"),this.remove=function(t){g(t);var e,r=l(t),u=null,o=h(i,r);return o&&(u=o.removeEntryForKey(t),null!==u&&0==o.entries.length&&(e=f(n,r),n.splice(e,1),delete i[r])),u},this.size=function(){for(var t=0,e=n.length;e--;)t+=n[e].entries.length;return t}}var y="function",p="string",v="undefined";if(typeof encodeURIComponent==v||Array.prototype.splice===t||Object.prototype.hasOwnProperty===t)return null;var g=o("key"),d=o("value"),E=0,K=1,q=2;return s.prototype={getEqualityFunction:function(t){return typeof t.equals==y?i:u},getEntryForKey:a(K),getEntryAndIndexForKey:a(q),removeEntryForKey:function(t){var n=this.getEntryAndIndexForKey(t);return n?(this.entries.splice(n[0],1),n[1]):null},addEntry:function(t,n){this.entries.push([t,n])},keys:l(0),values:l(1),getEntries:function(t){for(var n=t.length,e=0,r=this.entries,i=r.length;i>e;++e)t[n+e]=r[e].slice(0)},containsKey:a(E),containsValue:function(t){for(var n=this.entries,e=n.length;e--;)if(t===n[e][1])return!0;return!1}},c.prototype={each:function(t){for(var n,e=this.entries(),r=e.length;r--;)n=e[r],t(n[0],n[1])},equals:function(t){var n,e,r,i=this.size();if(i==t.size()){for(n=this.keys();i--;)if(e=n[i],r=t.get(e),null===r||r!==this.get(e))return!1;return!0}return!1},putAll:function(t,n){for(var e,r,i,u,o=t.entries(),s=o.length,a=typeof n==y;s--;)e=o[s],r=e[0],i=e[1],a&&(u=this.get(r))&&(i=n(r,u,i)),this.put(r,i)},clone:function(){var t=new c(this.properties);return t.putAll(this),t}},c.prototype.toQueryString=function(){for(var t,e=this.entries(),r=e.length,i=[];r--;)t=e[r],i[r]=encodeURIComponent(n(t[0]))+"="+encodeURIComponent(n(t[1]));return i.join("&")},c}();


/**
 * jquery.numberformatter - Formatting/Parsing Numbers in jQuery
 * 
 * Written by
 * Michael Abernethy (mike@abernethysoft.com),
 * Andrew Parry (aparry0@gmail.com)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * @author Michael Abernethy, Andrew Parry
 * @version 1.2.4-RELEASE ($Id$)
 * 
 * Dependencies
 * 
 * jQuery (http://jquery.com)
 * jshashtable (http://www.timdown.co.uk/jshashtable)
 * 
 * Notes & Thanks
 * 
 * many thanks to advweb.nanasi.jp for his bug fixes
 * jsHashtable is now used also, so thanks to the author for that excellent little class.
 *
 * This plugin can be used to format numbers as text and parse text as Numbers
 * Because we live in an international world, we cannot assume that everyone
 * uses "," to divide thousands, and "." as a decimal point.
 *
 * As of 1.2 the way this plugin works has changed slightly, parsing text to a number
 * has 1 set of functions, formatting a number to text has it's own. Before things
 * were a little confusing, so I wanted to separate the 2 out more.
 *
 *
 * jQuery extension functions:
 *
 * formatNumber(options, writeBack, giveReturnValue) - Reads the value from the subject, parses to
 * a Javascript Number object, then formats back to text using the passed options and write back to
 * the subject.
 * 
 * parseNumber(options) - Parses the value in the subject to a Number object using the passed options
 * to decipher the actual number from the text, then writes the value as text back to the subject.
 * 
 * 
 * Generic functions:
 * 
 * formatNumber(numberString, options) - Takes a plain number as a string (e.g. '1002.0123') and returns
 * a string of the given format options.
 * 
 * parseNumber(numberString, options) - Takes a number as text that is formatted the same as the given
 * options then and returns it as a plain Number object.
 * 
 * To achieve the old way of combining parsing and formatting to keep say a input field always formatted
 * to a given format after it has lost focus you'd simply use a combination of the functions.
 * 
 * e.g.
 * $("#salary").blur(function(){
 *      $(this).parseNumber({format:"#,###.00", locale:"us"});
 *      $(this).formatNumber({format:"#,###.00", locale:"us"});
 * });
 *
 * The syntax for the formatting is:
 * 0 = Digit
 * # = Digit, zero shows as absent
 * . = Decimal separator
 * - = Negative sign
 * , = Grouping Separator
 * % = Percent (multiplies the number by 100)
 * 
 * For example, a format of "#,###.00" and text of 4500.20 will
 * display as "4.500,20" with a locale of "de", and "4,500.20" with a locale of "us"
 *
 *
 * As of now, the only acceptable locales are 
 * Arab Emirates -> "ae"
 * Australia -> "au"
 * Austria -> "at"
 * Brazil -> "br"
 * Canada -> "ca"
 * China -> "cn"
 * Czech -> "cz"
 * Denmark -> "dk"
 * Egypt -> "eg"
 * Finland -> "fi"
 * France  -> "fr"
 * Germany -> "de"
 * Greece -> "gr"
 * Great Britain -> "gb"
 * Hong Kong -> "hk"
 * India -> "in"
 * Israel -> "il"
 * Japan -> "jp"
 * Russia -> "ru"
 * South Korea -> "kr"
 * Spain -> "es"
 * Sweden -> "se"
 * Switzerland -> "ch"
 * Taiwan -> "tw"
 * Thailand -> "th"
 * United States -> "us"
 * Vietnam -> "vn"
 **/
(function(k){var a=new Hashtable();var f=["ae","au","ca","cn","eg","gb","hk","il","in","jp","sk","th","tw","us"];var b=["at","br","de","dk","es","gr","it","nl","pt","tr","vn"];var i=["bg","cz","fi","fr","no","pl","ru","se"];var d=["ch"];var g=[[".",","],[",","."],[","," "],[".","'"]];var c=[f,b,i,d];function j(n,l,m){this.dec=n;this.group=l;this.neg=m}function h(){for(var l=0;l<c.length;l++){var n=c[l];for(var m=0;m<n.length;m++){a.put(n[m],l)}}}function e(l,r){if(a.size()==0){h()}var q=".";var o=",";var p="-";if(r==false){if(l.indexOf("_")!=-1){l=l.split("_")[1].toLowerCase()}else{if(l.indexOf("-")!=-1){l=l.split("-")[1].toLowerCase()}}}var n=a.get(l);if(n){var m=g[n];if(m){q=m[0];o=m[1]}}return new j(q,o,p)}k.fn.formatNumber=function(l,m,n){return this.each(function(){if(m==null){m=true}if(n==null){n=true}var p;if(k(this).is(":input")){p=new String(k(this).val())}else{p=new String(k(this).text())}var o=k.formatNumber(p,l);if(m){if(k(this).is(":input")){k(this).val(o)}else{k(this).text(o)}}if(n){return o}})};k.formatNumber=function(q,w){var w=k.extend({},k.fn.formatNumber.defaults,w);var l=e(w.locale.toLowerCase(),w.isFullLocale);var n=l.dec;var u=l.group;var o=l.neg;var m="0#-,.";var t="";var s=false;for(var r=0;r<w.format.length;r++){if(m.indexOf(w.format.charAt(r))==-1){t=t+w.format.charAt(r)}else{if(r==0&&w.format.charAt(r)=="-"){s=true;continue}else{break}}}var v="";for(var r=w.format.length-1;r>=0;r--){if(m.indexOf(w.format.charAt(r))==-1){v=w.format.charAt(r)+v}else{break}}w.format=w.format.substring(t.length);w.format=w.format.substring(0,w.format.length-v.length);var p=new Number(q);return k._formatNumber(p,w,v,t,s)};k._formatNumber=function(m,q,n,H,t){var q=k.extend({},k.fn.formatNumber.defaults,q);var F=e(q.locale.toLowerCase(),q.isFullLocale);var E=F.dec;var w=F.group;var l=F.neg;if(q.overrideGroupSep!=null){w=q.overrideGroupSep}if(q.overrideDecSep!=null){E=q.overrideDecSep}if(q.overrideNegSign!=null){l=q.overrideNegSign}var z=false;if(isNaN(m)){if(q.nanForceZero==true){m=0;z=true}else{return""}}if(q.isPercentage==true||(q.autoDetectPercentage&&n.charAt(n.length-1)=="%")){m=m*100}var B="";if(q.format.indexOf(".")>-1){var G=E;var u=q.format.substring(q.format.lastIndexOf(".")+1);if(q.round==true){m=new Number(m.toFixed(u.length))}else{var L=m.toString();if(L.lastIndexOf(".")>0){L=L.substring(0,L.lastIndexOf(".")+u.length+1)}m=new Number(L)}var A=new Number(m.toString().substring(m.toString().indexOf(".")));decimalString=new String(A.toFixed(u.length));decimalString=decimalString.substring(decimalString.lastIndexOf(".")+1);for(var I=0;I<u.length;I++){if(u.charAt(I)=="#"&&decimalString.charAt(I)!="0"){G+=decimalString.charAt(I);continue}else{if(u.charAt(I)=="#"&&decimalString.charAt(I)=="0"){var r=decimalString.substring(I);if(r.match("[1-9]")){G+=decimalString.charAt(I);continue}else{break}}else{if(u.charAt(I)=="0"){G+=decimalString.charAt(I)}}}}B+=G}else{m=Math.round(m)}var v=Math.floor(m);if(m<0){v=Math.ceil(m)}var D="";if(q.format.indexOf(".")==-1){D=q.format}else{D=q.format.substring(0,q.format.indexOf("."))}var K="";if(!(v==0&&D.substr(D.length-1)=="#")||z){var x=new String(Math.abs(v));var p=9999;if(D.lastIndexOf(",")!=-1){p=D.length-D.lastIndexOf(",")-1}var o=0;for(var I=x.length-1;I>-1;I--){K=x.charAt(I)+K;o++;if(o==p&&I!=0){K=w+K;o=0}}if(D.length>K.length){var J=D.indexOf("0");if(J!=-1){var C=D.length-J;var s=D.length-K.length-1;while(K.length<C){var y=D.charAt(s);if(y==","){y=w}K=y+K;s--}}}}if(!K&&D.indexOf("0",D.length-1)!==-1){K="0"}B=K+B;if(m<0&&t&&H.length>0){H=l+H}else{if(m<0){B=l+B}}if(!q.decimalSeparatorAlwaysShown){if(B.lastIndexOf(E)==B.length-1){B=B.substring(0,B.length-1)}}B=H+B+n;return B};k.fn.parseNumber=function(l,m,o){if(m==null){m=true}if(o==null){o=true}var p;if(k(this).is(":input")){p=new String(k(this).val())}else{p=new String(k(this).text())}var n=k.parseNumber(p,l);if(n){if(m){if(k(this).is(":input")){k(this).val(n.toString())}else{k(this).text(n.toString())}}if(o){return n}}};k.parseNumber=function(u,z){var z=k.extend({},k.fn.parseNumber.defaults,z);var m=e(z.locale.toLowerCase(),z.isFullLocale);var r=m.dec;var x=m.group;var s=m.neg;if(z.overrideGroupSep!=null){x=z.overrideGroupSep}if(z.overrideDecSep!=null){r=z.overrideDecSep}if(z.overrideNegSign!=null){s=z.overrideNegSign}var l="1234567890";var p=".-";var n=z.strict;while(u.indexOf(x)>-1){u=u.replace(x,"")}u=u.replace(r,".").replace(s,"-");var y="";var q=false;if(z.isPercentage==true||(z.autoDetectPercentage&&u.charAt(u.length-1)=="%")){q=true}for(var v=0;v<u.length;v++){if(l.indexOf(u.charAt(v))>-1){y=y+u.charAt(v)}else{if(p.indexOf(u.charAt(v))>-1){y=y+u.charAt(v);p=p.replace(u.charAt(v),"")}else{if(z.allowPostfix){break}else{if(n){y="NaN";break}}}}}var t=new Number(y);if(q){t=t/100;var w=y.indexOf(".");if(w!=-1){var o=y.length-w-1;t=t.toFixed(o+2)}else{t=t.toFixed(2)}}return t};k.fn.parseNumber.defaults={locale:"us",decimalSeparatorAlwaysShown:false,isPercentage:false,autoDetectPercentage:true,isFullLocale:false,strict:false,overrideGroupSep:null,overrideDecSep:null,overrideNegSign:null,allowPostfix:false};k.fn.formatNumber.defaults={format:"#,###.00",locale:"us",decimalSeparatorAlwaysShown:false,nanForceZero:true,round:true,isFullLocale:false,overrideGroupSep:null,overrideDecSep:null,overrideNegSign:null,isPercentage:false,autoDetectPercentage:true};Number.prototype.toFixed=function(l){return k._roundNumber(this,l)};k._roundNumber=function(n,m){var l=Math.pow(10,m||0);var o=String(Math.round(n*l)/l);if(m>0){var p=o.indexOf(".");if(p==-1){o+=".";p=0}else{p=o.length-(p+1)}while(p<m){o+="0";p++}}return o}})(jQuery);