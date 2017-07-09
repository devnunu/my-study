package backjoon.ex_2161;


import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 9..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Queue<Integer> queue = new LinkedList<Integer>();
        int num = sc.nextInt();

        for(int i =1; i<=num; i++){
            queue.offer(i);
        }

        while(true){
            System.out.print(queue.poll()+" ");
            if(queue.size()==0){
                break;
            }
            queue.offer(queue.poll());
        }


    }
}
