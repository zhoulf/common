function Promise(){ this._thens = []; }
    
Promise.prototype = {
    constructor: Promise,
    
    state: "pending",
    
    then: function(onResolve, onReject){
        this._thens.push({ resolve: onResolve, reject: onReject });
        return this;
    },
    
    resolve: function(){ return this._complete("resolve", arguments); },
    
    reject: function(){ return this._complete("reject", arguments); },
    
    _complete: function(which, args){
        this.then = which === "resolve" ?
            function(onResolve){ onResolve && onResolve.apply(null, args); } :
            function(_, onReject){ onReject && onReject.apply(null, args); };
        
        this.state = which === "resolve" ? "resolved" : "rejected";
        
        this.resolve = this.reject = 
            function(){ throw "Promise already completed"; };
        
        var i = 0, then;
        while(then = this._thens[i++]){ then[which] && then[which].apply(null, args); }
        this._thens = null;
        return this;
    }
};