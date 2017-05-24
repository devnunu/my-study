package data_structure.queue;

/**
 * Created by homr on 2017. 5. 24..
 */
public class ArrayQueue {
    int head;
    int tail;
    int[] queue;
    int capacity;

    public static void main(String args[]){
        ArrayQueue q = new ArrayQueue(5);
        
        q.poll();
        q.peek();

        q.offer(1);
        q.offer(13);
        q.offer(14);
        q.offer(16);
        q.offer(21);
        q.offer(25);

        System.out.println(q.peek());

        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
        System.out.println(q.poll());
    }

    ArrayQueue(int size){
        this.head = 0;
        this.tail = 0;
        capacity = size;
        queue = new int[size];
    }

    public void offer(int v){
        if(tail==capacity){
            System.out.println("error! out of queue range!");
            return;
        }

        queue[tail++] = v;
    }

    public int poll(){
        if(isEmpty()){
            System.out.println("error! this is empty queue!");
            return -1;
        }
        int data = queue[head];
        head++;
        return data;
    }

    public int peek(){
        if(isEmpty()){
            System.out.println("error! this is empty queue!");
            return -1;
        }
        return queue[head];
    }

    public boolean isEmpty(){
        return head==tail;
    }
}
