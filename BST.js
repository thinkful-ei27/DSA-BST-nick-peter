class BinarySearchTree {
  constructor(key = null, value = parent, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
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
      } 
    }
  }  
}