package data_structure.stack;

/**
 * Created by homr on 2017. 5. 22..
 */
public class LinkStack {
    public StackNode top;

    public static void main(String[] args){
        LinkStack st = new LinkStack();
        st.pop();
        st.peek();

        st.push(1);
        st.push(1);
        st.push(2);
        st.push(5);
        st.push(9);

        System.out.println(st.peek());
        System.out.println(st.pop());
        System.out.println(st.pop());
        System.out.println(st.pop());

    }

    LinkStack(){
        top = null;
    }

    public void push(int v){
        StackNode node = new StackNode(v);
        node.setNext(top);
        top = node;
    }

    public int pop(){
        if(isEmpty()){
            System.out.println("underflow!");
            return -1;
        }
        int data = peek();
        top = top.getNext();
        return data;
    }

    public int peek(){
        if(isEmpty()){
            System.out.println("stack is empty");
            return -1;
        }
        return top.getValue();
    }

    public boolean isEmpty(){
        return (top==null);
    }
}

class StackNode{
    private int value;
    private StackNode next;

    StackNode(int v){
        this.value = v;
        this.next = null;
    }

    public int getValue(){
        return this.value;
    }

    public void setNext(StackNode node){
        this.next = node;
    }

    public StackNode getNext(){
        return this.next;
    }
}
