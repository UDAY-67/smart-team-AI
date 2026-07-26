package com.smartteam.teamformation.algorithm;

import java.util.*;

/**
 * ADVANCED GRAPH-BASED TEAM MATCHER
 *
 * DAA Concept:
 * - Weighted Undirected Graph
 * - Breadth First Search (BFS)
 *
 * Purpose:
 * Model student compatibility as a graph where:
 *
 * - Students = Nodes
 * - Compatibility Score = Weighted Edge
 *
 * This can help future versions of the system
 * perform advanced teammate relationship analysis.
 */

public class GraphTeamMatcher {

    /**
     * Edge class represents connection between students.
     */
    static class Edge {
        String targetStudent;
        int compatibilityScore;

        public Edge(String targetStudent, int compatibilityScore) {
            this.targetStudent = targetStudent;
            this.compatibilityScore = compatibilityScore;
        }
    }

    /**
     * Graph represented using adjacency list.
     */
    private Map<String, List<Edge>> graph = new HashMap<>();

    /**
     * Adds a student node to graph.
     */
    public void addStudent(String studentName) {
        graph.putIfAbsent(studentName, new ArrayList<>());
    }

    /**
     * Adds compatibility connection between two students.
     *
     * Since this is an undirected graph:
     * A <-> B
     */
    public void addCompatibility(
            String student1,
            String student2,
            int compatibilityScore
    ) {

        graph.get(student1).add(    
                new Edge(student2, compatibilityScore)
        );

        graph.get(student2).add(
                new Edge(student1, compatibilityScore)
        );
    }

    /**
     * BFS Traversal to explore connected teammates.
     *
     * Time Complexity: O(V + E)
     *
     * V = Number of Students
     * E = Number of Compatibility Connections
     */
    public void bfsTraversal(String startingStudent) {

        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        visited.add(startingStudent);
        queue.offer(startingStudent);

        System.out.println("\n=== Team Compatibility Traversal ===");

        while (!queue.isEmpty()) {

            String current = queue.poll();

            System.out.println("Exploring Team Connections for: " + current);

            for (Edge edge : graph.get(current)) {

                System.out.println(
                        " -> Connected with "
                                + edge.targetStudent
                                + " | Compatibility Score: "
                                + edge.compatibilityScore
                );

                if (!visited.contains(edge.targetStudent)) {
                    visited.add(edge.targetStudent);
                    queue.offer(edge.targetStudent);
                }
            }
        }
    }

    /**
     * Demo Execution
     */
    public static void main(String[] args) {

        GraphTeamMatcher matcher = new GraphTeamMatcher();

        // Adding students
        matcher.addStudent("Uday");
        matcher.addStudent("Rahul");
        matcher.addStudent("Priya");
        matcher.addStudent("Arjun");
        matcher.addStudent("Sneha");

        // Adding compatibility connections
        matcher.addCompatibility("Uday", "Rahul", 85);
        matcher.addCompatibility("Uday", "Priya", 72);
        matcher.addCompatibility("Rahul", "Arjun", 90);
        matcher.addCompatibility("Priya", "Sneha", 80);

        // BFS Traversal
        matcher.bfsTraversal("Uday");
    }
}