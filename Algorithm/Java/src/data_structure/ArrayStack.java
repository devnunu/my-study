package data_structure;

/**
 * Created by homr on 2017. 5. 22..
 */
public class ArrayStack {
    private int[] stack;
    private int top;

    public static void main(String[] args){
        ArrayStack st = new ArrayStack(10);
        st.pop();
        st.peek();

        st.push(1);
        st.push(4);
        st.push(6);
        st.push(4);
        st.push(1);
        st.push(4);
        st.push(6);
        st.push(4);
        st.push(6);
        st.push(4);
        st.push(6);

        System.out.println(st.peek());
        System.out.println(st.pop());
        System.out.println(st.pop());
        System.out.println(st.pop());

    }

    ArrayStack(int size){
        this.stack = new int[size];
        this.top = 0;
    }

    public void push(int v){
        if(top >= stack.length){
            System.out.println("stack size over!");
            return;
        }
        stack[top++] = v;

    }

    public int pop(){
        if(isEmpty()){
            System.out.println("Stack is empty!");
            return -1;
        }
        int data = stack[--top];
        return data;
    }

    public int peek(){
        if(isEmpty()){
            System.out.println("Stack is empty!");
            return -1;
        }
        return stack[top-1];
    }

    public boolean isEmpty(){
        return (top==0);
    }
}
