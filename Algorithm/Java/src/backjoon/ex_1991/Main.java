package backjoon.ex_1991;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 22..
 */

public class Main {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int num = in.nextInt();

        Node node = new Node();

        while (num != 0) {
            Node root = new Node(in.next().charAt(0));
            Node left = new Node(in.next().charAt(0));
            Node right = new Node(in.next().charAt(0));

            if (left.value != '.') {
                root.left = left;
            }
            if (right.value != '.') {
                root.right = right;
            }

            node.insert(root);
            num--;
        }

        /*
        *       A
        *     /   \
        *    B     C
        *   / \   / \
        *  D     E   F
        *             \
        *              G
         */

        node.preOrder(node);
        System.out.println();
        node.inOrder(node);
        System.out.println();
        node.postOrder(node);
        System.out.println();
    }

    public static class Node {
        public Node left;
        public Node right;
        public char value;

        Node() {
            this.value = 'A';
            this.left = this.right = null;
        }

        Node(char v) {
            this.value = v;
            this.left = this.right = null;
        }

        public void insert(Node node) {
            Node current = this;

            if(current.value == node.value){
                current.left = node.left;
                current.right = node.right;
                return;
            }

            if(current.left!=null){
                current.left.insert(node);
            }
            if(current.right!=null) {
                current.right.insert(node);
            }

            return;
        }


        public void preOrder(Node node) {
            Node current = node;
            if (current == null) {
                return;
            }

            System.out.print(current.value);
            preOrder(current.left);
            preOrder(current.right);
        }

        public void postOrder(Node node) {
            Node current = node;
            if (current == null) {
                return;
            }

            postOrder(current.left);
            postOrder(current.right);
            System.out.print(current.value);
        }

        public void inOrder(Node node) {
            Node current = node;
            if (current == null) {
                return;
            }

            inOrder(current.left);
            System.out.print(current.value);
            inOrder(current.right);
        }

    }
}

