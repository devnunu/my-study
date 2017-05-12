package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class Length {
    public static void main(String[] args){
        String str = "hello everyone!";
        System.out.println(length(str));
    }

    public static int length(String str){
        if(str.equals(""))
            return 0;
        else
            return 1+length(str.substring(1));
    }

}
