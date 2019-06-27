// Kernels

export function makePolyKernel(d,c){
    return function(v1, v2){
        let s=0;
        for(let q=0;q<v1.length;q++) { s += v1[q] * v2[q]; }
        s = s+c;
        return Math.pow(s,d);
    }
}

export function makeSigmoidKernel(c){
    return function(v1, v2){
        let s=0;
        for(let q=0;q<v1.length;q++) { s += v1[q] * v2[q]; }
        s = s+c;
        return Math.tanh(s);
    }
}

export function makeRbfKernel(sigma) {
    return function(v1, v2) {
        let s=0;
        for(let q=0;q<v1.length;q++) { s += (v1[q] - v2[q])*(v1[q] - v2[q]); }
        return Math.exp(-s/(2.0*sigma*sigma));
    }
}

export function linearKernel(v1, v2) {
    let s=0;
    for(let q=0;q<v1.length;q++) { s += v1[q] * v2[q]; }
    return s;
}