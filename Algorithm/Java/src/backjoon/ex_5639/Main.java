package backjoon.ex_5639;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 22..
 */
public class Main {
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        int num = in.nextInt();
        Tree tree = new Tree(num);

        while(in.hasNextInt()){
            num = in.nextInt();
            tree.insert(num);
        }

        tree.postOrder(tree);


    }
}

class Tree{
    public Tree left;
    public Tree right;
    public int value;

    Tree(int v){
        this.value = v;
        this.left=this.right=null;
    }

    public void insert(int v){
        Tree current = this;
        Tree parent = null;

        while(current!=null){
            if(current.value == v){
                this.value = v;
                return;
            }else if(current.value > v){
                parent = current;
                current = current.left;
            }else{
                parent = current;
                current = current.right;
            }
        }

        Tree t = new Tree(v);
        if(parent.value > t.value){
            parent.left = t;
        }else{
            parent.right = t;
        }
    }

    public void postOrder(Tree tree){
        if(tree==null){
            return;
        }
        postOrder(tree.left);
        postOrder(tree.right);
        System.out.println(tree.value);
    }
}