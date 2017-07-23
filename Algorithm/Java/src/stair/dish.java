package stair;

import java.util.Scanner;
import java.util.Stack;

/**
 * Created by homr on 2017. 7. 22..
 */
public class dish {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Stack<String> st = new Stack<String>();
        String[] arr = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
        String[] str = sc.next().split("");
        String result = "";
        int count = 0;

        if(str.length>=26){
            System.out.println("impossible");
            return;
        }

        while(str[0].charAt(0)!=arr[count].charAt(0)-1){
            st.push(arr[count]);
            result += "push\n";
            count++;
        }
        st.pop();
        result += "pop\n";


        for(int i=1; i<str.length; i++){
            if(str[i].charAt(0)<str[i-1].charAt(0)){
                if(!st.peek().equals(str[i])){
                    System.out.println("impossible");
                    return;
                }
                result += "pop\n";
                st.pop();
            }else{
                while(str[i].charAt(0)!=arr[count].charAt(0)-1){
                    st.push(arr[count]);
                    result += "push\n";
                    count++;
                }
                st.pop();
                result +="pop\n";
            }
        }

        System.out.println(result);

    }
}