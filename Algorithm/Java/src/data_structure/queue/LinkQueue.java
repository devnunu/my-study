package data_structure.queue;

/**
 * Created by homr on 2017. 5. 24..
 */
public class LinkQueue {
    private Node head;
    private Node tail;

    public static void main(String[] args){
        LinkQueue q = new LinkQueue();
        q.peek();
        q.poll();

        q.offer(1);
        q.offer(25);
        q.offer(12);
        q.offer(13);
        q.offer(14);
        q.offer(25);

        System.out.println(q.peek());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());


    }

    LinkQueue(){
        this.head = this.tail = null;
    }

    public void offer(int v){
        Node newNode = new Node(v);
        if(isEmpty()){
            head = tail = newNode;
            return;
        }

        if(head==tail){
            tail = newNode;
            head.setNext(tail);
        }else{
            tail.setNext(newNode);
            tail = newNode;
        }
    }

    public int poll(){
        if(isEmpty()){
            System.out.println("error! this is empty queue!");
            return -1;
        }

        int data = head.getValue();

        if(head.getNext()==null){
            tail = null;
        }

        head = head.getNext();

        return data;
    }

    public int peek(){
        if(isEmpty()){
            System.out.println("error! this is empty queue!");
            return -1;
        }

        return head.getValue();
    }

    public boolean isEmpty(){
        return (head==null)&&(tail==null);
    }
}

class Node{
    private int value;
    private Node next;

    Node(int v){
        this.value = v;
        this.next = null;
    }

    public int getValue(){
        return value;
    }

    public Node getNext(){
        return next;
    }

    public void setNext(Node node){
        this.next = node;
    }
}
