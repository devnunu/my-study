package backjoon.ex_7567;

import java.util.LinkedList;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 26..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        LinkedList<Character> stack = new LinkedList<Character>();
        int total = 10;

        String str = sc.nextLine();
        stack.addLast(str.charAt(0));

        for(int i = 1; i<str.length(); i++){
            char data = stack.removeLast();
            if(data == str.charAt(i)){
                total += 5;
            }else{
                total += 10;
            }
            stack.addLast(str.charAt(i));
        }

        System.out.print(total);
    }
}
