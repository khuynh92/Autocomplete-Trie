/*
 * This module serves 2 primary functions
 *
 * create()
 * takes a dictionary
 * returns trie data structure
 *
 * check()
 * taske a trie and a query
 * returns a result from querying the trie
 *
 * you should not alter the arguments for create or check
 * you may create any helper functions that you might need
 *
 */

/*
 * Write an algorithm that builds a trie structure from a dictionary
 *   during development, use `npm run test:create`
 *   it may be more convenient to use nodemon `npx nodemon test/create`
 *
 * parameters:
 *   @dictionary   an object containing words and definitions
 *                 see ./test/sample-dictionary.json as a reference
 * returns:
 *   An object containing all words from given dictionary
 *   stored in a Trie structure that is compatible with check()
 */
const create = dictionary => {
let trie = {
  value: null,
  children: {},
}

let wordsArray = Object.keys(dictionary)

let currentObj = trie;

wordsArray.forEach(word => {
  for( let i = 0; i < word.length; i++) {
    let letter = word[i]
    if(!currentObj.children[letter]) {
    let newObj = {
      value: null,
      children: {}
    }
    currentObj.children[letter] = newObj
    currentObj = currentObj.children[letter]
  } else {
    currentObj = currentObj.children[letter]
  }
}
  
  currentObj.value = dictionary[word]
  currentObj = trie
})

return trie
}

/*
 * Write an algorithm that checks a trie for a query
 *   during development, use `npm run test:check`
 *   it may be more convenient to use nodemon `npx nodemon test/check`
 *
 * parameters:
 *   @trie         an Trie structure containing all words in a dictionary
 *                 see ./test/sample-trie.json for the object shape
 *
 *   @query        an String input to check the trie for existing nodes
 *
 * returns:
 *   @result that is one of:
 *
 *   node value    the value of a node if the trie contains the query in either a branch or a leaf node
 *   true          if the trie contains the query in a branch and is not a leaf node (does not have a value)
 *   false         if the trie does not contain the query in either a branch or a leaf node
 *
 * @result if query found a leaf node that is not a branch
 *   { ...the data stored in this node }
 *
 * @result if query found a leaf node that is also a branch
 *   { ...the data stored in this node }
 *
 * @result if query found a branch that is not a leaf node
 *   true
 *
 * @result if query did not find a leaf node or branch
 *   false
 *
 */

check = (trie, query) => {
  let currentObj = trie;

  for(let i = 0; i < query.length; i++) {
    let letter = query[i]
    if(currentObj.children[letter]) {
      currentObj = currentObj.children[letter]
    } else {
      return false
    }
  }
  if (currentObj.value) return currentObj.value

  if (currentObj.children) return true
}


module.exports = {
  create,
  check,
};
