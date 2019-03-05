class BinarySearchTree {
  constructor(key = null, value = parent, parent = null) {
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
        return 'The key does not exist within the Tree.';
      }
  }
}