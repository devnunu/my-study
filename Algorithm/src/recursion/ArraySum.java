package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class ArraySum {
    public static void main(String[] args){
        int[] arr = {1,2,3,4};
        System.out.print(sum(4,arr));
    }

    public static int sum(int n, int [] data){
        if(n<=0)
            return 0;
        else
            return sum(n-1, data) + data[n-1];
    }
}
