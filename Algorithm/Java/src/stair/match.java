package stair;

import java.util.Scanner;
import java.util.Stack;

/**
 * Created by homr on 2017. 7. 22..
 */
public class match {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Stack<Integer> st = new Stack<Integer>();
        String str = sc.next();
        String result = "";

        for(int i = 0; i<str.length(); i++){
            if(str.charAt(i)=='('){
                st.push(i);
            }else if(str.charAt(i)==')'){
                if(st.size()==0){
                    System.out.println("not match");
                    return;
                }else {
                    result += (st.pop()+" "+i+"\n");
                }
            }
        }

        if(st.size()!=0){
            System.out.println("not match");
        }else{
            System.out.println(result);
        }
    }
}
