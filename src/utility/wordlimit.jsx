
export function wordLimit(text,limit){
    const array = text.split(" ")
    const newarr = array.slice(0,limit).join(' ') + '...'
   
   
    return newarr

}


wordLimit('The quick brown fox jumps over the lazy dog. the quick brown fox jumps over the lazy dog. the quick brown fox jumps over the lazy dog.')