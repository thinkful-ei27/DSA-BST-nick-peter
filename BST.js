class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //BigO notation: Average case: O(log(n)), worse case (unbalanced tree): O(n)
    //Best case: O(1), empty tree

    // if the tree is empty then this key become the root of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    /* If the tree already exist, then start at the root, 
    and compare it to the key you want to insert
    If the new key is less than the node's key 
    then the new node needs to live in the left-hand branch. */
    else if (key < this.key) {
      // is there something in this.left. If not then we make a new BST
      // if there is then we recursilely call the insert function 
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
       // console.log('this.left============',this.left);
        
      } else {
        return this.left.insert(key, value);
      }
    } else {
      //key > this.key
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      } else {
        return this.right.insert(key, value);
      }
    }
  }
  
  find(key){
    //BigO notation: Best: O(1) root key === key Average: O(log(n)) don't have to search
    //all the data Worst: O(n), very unbalanced tree 
    //check if this.key === key
    if(this.key === key){
      return this.value;
    } else if(key < this.key && this.left){
      return this.left.find(key);
    } 
    else if (key > this.key && this.right){
      return this.right.find(key);
    } else {
      return 'The key does not exist within the Tree';
    }
  }

  remove(key){
    // BigO notation: Best Case: O(1) - the node is the root
    // Average case: O(log(n)) b/c we are dealing w/ BST. Worst Case O(n): We have a very uneven BST
    // 

    //3 scenarios: No children, 1 child, 2 children
    if(this.key === key){
      //scenario: 2 kids
      if(this.left && this.right){
        const successor = this.right_findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if(this.left){
        this._replaceWith(this.left);
      } else if(this.right){
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    }else if (key < this.key && this.left){
      this.left.remove(key);
    }else if (key > this.key && this.right){
      this.right.remove(key);
    } else {
      return 'The key does not exist within the Tree';
    }
  }

  
  _replaceWith(node){
    //BigO notation: 

    if(this.parent){
      //case1: this === this.parent.left
      if(this === this.parent.left){
        this.parent.left = node;
      } else if(this === this.parent.right){
        this.parent.right === node;
      }
      if(node){
        node.parent = this.parent;
      }
    }
    else{
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left.findMin();
  }
  
}

// Height of a BST
// Write an algo to find the height of a binary search tree. What is the runtime of your algo
// Big O notation runtime: Average/Worst: O(n), we're going through the whole thing
// Best case O(1): BST has 0 or 1 nodes, highly unlikely

function heightOfBst(bst, answer = 1) {
  if(bst.key === null){
    return 0;
  }
  // base case: when we get null on both sides
  if(!bst.left && !bst.right){
    return answer;
  }
  if(bst.left && bst.right){
    return heightOfBst(bst.left, answer + 1) > heightOfBst(bst.right, answer + 1) ? 
    heightOfBst(bst.left, answer + 1) : heightOfBst(bst.right, answer + 1);
  }
  if(bst.left){
    return heightOfBst(bst.left, answer + 1)
  }
  if(bst.right){
    return heightOfBst(bst.right, answer + 1)
  }
}

function main() {
  const BST = new BinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  console.log(heightOfBst(BST));
  // const empty = new BinarySearchTree();
  // console.log(heightOfBst(empty));
}

main();