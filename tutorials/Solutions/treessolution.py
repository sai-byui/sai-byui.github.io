class BST:
    def __init__(self, val=None):
        self.left = None
        self.right = None
        self.val = val

def sorted_bst(number):
    if not number:
        return None
    else:
        mid_val = len(number)//2

        node = BST(number[mid_val])

        node.left = sorted_bst(number[:mid_val])

        node.right = sorted_bst(number[mid_val+1:])
        """you can see in the code above that we search through the list by comparing the  
        middle value of the number and the nodes to the left and right
        """
        return node

def print_order(node): 
    if not node: 
        return

    print(node.val)

    print_order(node.left) 

    print_order(node.right)   
    """
    you can see how the purpose of this code is to print the numbers in the same way we ordered it above
    """
result = sorted_bst([1, 2, 3, 4, 5, 6, 7])

print_order(result)