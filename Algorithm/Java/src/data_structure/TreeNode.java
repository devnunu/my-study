package data_structure;

/**
 * Created by homr on 2017. 5. 18..
 */

public class TreeNode {
    public TreeNode left;
    public TreeNode right;
    public int value;

    public TreeNode(int v) {
        this.value = v;
        this.left = this.right = null;
    }
    public TreeNode search(int v) {
        TreeNode current = this;
        while(current != null){
            if(current.value == v)
                return current;
            else if(v<current.value)
                current = current.left;
            else
                current = current.right;
        }
        return null;
    }

    public void insert(int v) {
        TreeNode current = this;
        TreeNode parent = null;
        while(current != null){
            if(current.value == v) {
                System.out.println("this value is already exist");
                this.value = v;
                return;
            }
            else if(v<current.value) {
                parent = current;
                current = current.left;
            }
            else {
                parent = current;
                current = current.right;
            }
        }

        TreeNode t = new TreeNode(v);
    }

    public void visit(TreeNode t) {
        //TODO implement
    }

    public void printAll(TreeNode t) {
        //TODO implement
    }

    public static void main(String[] args) {
        TreeNode t = new TreeNode(5);
        t.insert(5);
        t.insert(3);
        t.insert(7);
        t.insert(2);
        t.insert(4);
        t.insert(9);
    }
}